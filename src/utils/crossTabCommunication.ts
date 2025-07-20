
// Cross-tab communication utility using BroadcastChannel API
class CrossTabCommunication {
  private static instance: CrossTabCommunication;
  private channel: BroadcastChannel;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private fallbackInterval?: NodeJS.Timeout;

  private constructor() {
    // Use BroadcastChannel for reliable cross-tab communication
    this.channel = new BroadcastChannel('apex_settings_sync');
    this.setupChannelListener();
    this.setupFallbackPolling();
  }

  static getInstance(): CrossTabCommunication {
    if (!CrossTabCommunication.instance) {
      CrossTabCommunication.instance = new CrossTabCommunication();
    }
    return CrossTabCommunication.instance;
  }

  private setupChannelListener(): void {
    this.channel.addEventListener('message', (event) => {
      console.log('[CrossTabCommunication] BroadcastChannel message received:', event.data);
      const { type, data, timestamp } = event.data;
      
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
    // Aggressive fallback polling every 1 second
    this.fallbackInterval = setInterval(() => {
      const lastUpdate = localStorage.getItem('apex_force_sync_trigger');
      if (lastUpdate) {
        try {
          const updateData = JSON.parse(lastUpdate);
          const timeDiff = Date.now() - updateData.timestamp;
          
          // If update is fresh (less than 2 seconds old), process it
          if (timeDiff < 2000) {
            console.log('[CrossTabCommunication] Fallback polling detected fresh update:', updateData);
            this.emit(updateData.type, updateData.data, false); // Don't re-trigger storage
          }
        } catch (error) {
          console.error('[CrossTabCommunication] Fallback polling error:', error);
        }
      }
    }, 1000);
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
    console.log('[CrossTabCommunication] Emitting event:', type, data);
    
    const eventData = {
      type,
      data,
      timestamp: Date.now(),
      id: Math.random().toString(36)
    };

    try {
      // 1. BroadcastChannel (primary)
      this.channel.postMessage(eventData);
      console.log('[CrossTabCommunication] BroadcastChannel message sent');

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

      // 3. localStorage fallback trigger
      if (triggerStorage) {
        localStorage.setItem('apex_force_sync_trigger', JSON.stringify(eventData));
        console.log('[CrossTabCommunication] localStorage fallback trigger set');
        
        // Trigger storage event manually
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apex_force_sync_trigger',
          newValue: JSON.stringify(eventData),
          oldValue: null,
          storageArea: localStorage
        }));
      }

    } catch (error) {
      console.error('[CrossTabCommunication] Event emission failed:', error);
    }
  }

  destroy(): void {
    this.channel.close();
    if (this.fallbackInterval) {
      clearInterval(this.fallbackInterval);
    }
  }
}

export const crossTabCommunication = CrossTabCommunication.getInstance();
