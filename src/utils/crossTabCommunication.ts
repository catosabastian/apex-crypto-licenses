
// Optimized Cross-tab communication utility
class CrossTabCommunication {
  private static instance: CrossTabCommunication;
  private channel: BroadcastChannel | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private fallbackInterval?: NodeJS.Timeout;
  private isInitialized = false;

  private constructor() {
    this.initialize();
  }

  static getInstance(): CrossTabCommunication {
    if (!CrossTabCommunication.instance) {
      CrossTabCommunication.instance = new CrossTabCommunication();
    }
    return CrossTabCommunication.instance;
  }

  private initialize(): void {
    if (this.isInitialized) return;
    
    try {
      // Use BroadcastChannel for reliable cross-tab communication
      this.channel = new BroadcastChannel('apex_settings_sync');
      this.setupChannelListener();
      this.setupFallbackPolling();
      this.isInitialized = true;
      console.log('[CrossTabCommunication] Initialized successfully');
    } catch (error) {
      console.error('[CrossTabCommunication] Initialization failed:', error);
    }
  }

  private setupChannelListener(): void {
    if (!this.channel) return;

    this.channel.addEventListener('message', (event) => {
      console.log('[CrossTabCommunication] Message received:', event.data);
      const { type, data } = event.data;
      
      if (this.listeners.has(type)) {
        this.listeners.get(type)?.forEach(callback => {
          try {
            callback(data);
          } catch (error) {
            console.error('[CrossTabCommunication] Listener callback failed:', error);
          }
        });
      }
    });
  }

  private setupFallbackPolling(): void {
    // Moderate fallback polling every 3 seconds (reduced from 1 second)
    this.fallbackInterval = setInterval(() => {
      const lastUpdate = localStorage.getItem('apex_force_sync_trigger');
      if (lastUpdate) {
        try {
          const updateData = JSON.parse(lastUpdate);
          const timeDiff = Date.now() - updateData.timestamp;
          
          // If update is fresh (less than 5 seconds old), process it
          if (timeDiff < 5000) {
            console.log('[CrossTabCommunication] Fallback detected update:', updateData);
            this.emit(updateData.type, updateData.data, false);
          }
        } catch (error) {
          console.error('[CrossTabCommunication] Fallback polling error:', error);
        }
      }
    }, 3000);
  }

  addEventListener(type: string, callback: (data: any) => void): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(callback);
    console.log('[CrossTabCommunication] Event listener added for:', type);
  }

  removeEventListener(type: string, callback: (data: any) => void): void {
    this.listeners.get(type)?.delete(callback);
  }

  emit(type: string, data: any, triggerStorage: boolean = true): void {
    console.log('[CrossTabCommunication] Emitting event:', type);
    
    const eventData = {
      type,
      data,
      timestamp: Date.now(),
      id: Math.random().toString(36)
    };

    try {
      // 1. BroadcastChannel (primary)
      if (this.channel) {
        this.channel.postMessage(eventData);
        console.log('[CrossTabCommunication] BroadcastChannel message sent');
      }

      // 2. Trigger local listeners immediately
      if (this.listeners.has(type)) {
        this.listeners.get(type)?.forEach(callback => {
          try {
            callback(data);
          } catch (error) {
            console.error('[CrossTabCommunication] Local listener failed:', error);
          }
        });
      }

      // 3. localStorage fallback trigger (only if requested)
      if (triggerStorage) {
        localStorage.setItem('apex_force_sync_trigger', JSON.stringify(eventData));
        console.log('[CrossTabCommunication] localStorage fallback trigger set');
      }

    } catch (error) {
      console.error('[CrossTabCommunication] Event emission failed:', error);
    }
  }

  destroy(): void {
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
    if (this.fallbackInterval) {
      clearInterval(this.fallbackInterval);
    }
    this.listeners.clear();
    this.isInitialized = false;
    console.log('[CrossTabCommunication] Destroyed');
  }
}

export const crossTabCommunication = CrossTabCommunication.getInstance();
