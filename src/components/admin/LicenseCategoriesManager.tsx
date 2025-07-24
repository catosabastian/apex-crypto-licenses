import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Shield, CheckCircle, Star, Crown, Building, Trophy, Eye, EyeOff } from 'lucide-react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

interface LicenseCategory {
  id: string;
  category_number: number;
  name: string;
  price: string;
  min_volume: string;
  validity_period_months: number;
  available: boolean;
  features: string[];
  icon: string;
  color: string;
  display_order: number;
  popular: boolean;
  exclusive: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface LicenseCategoryFormData {
  category_number: number;
  name: string;
  price: string;
  min_volume: string;
  validity_period_months: number;
  available: boolean;
  features: string[];
  icon: string;
  color: string;
  display_order: number;
  popular: boolean;
  exclusive: boolean;
  description: string;
}

const ICON_OPTIONS = [
  { value: 'Shield', label: 'Shield' },
  { value: 'CheckCircle', label: 'Check Circle' },
  { value: 'Star', label: 'Star' },
  { value: 'Crown', label: 'Crown' },
  { value: 'Building', label: 'Building' },
  { value: 'Trophy', label: 'Trophy' }
];

const COLOR_OPTIONS = [
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'purple', label: 'Purple' },
  { value: 'gold', label: 'Gold' },
  { value: 'platinum', label: 'Platinum' },
  { value: 'diamond', label: 'Diamond' }
];

const LicenseCategoriesManager = () => {
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<LicenseCategory | null>(null);
  const [formData, setFormData] = useState<LicenseCategoryFormData>({
    category_number: 1,
    name: '',
    price: '',
    min_volume: '',
    validity_period_months: 12,
    available: true,
    features: [],
    icon: 'Shield',
    color: 'blue',
    display_order: 0,
    popular: false,
    exclusive: false,
    description: ''
  });
  const [featuresInput, setFeaturesInput] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await supabaseDataManager.getLicenseCategories();
      setCategories(data.map(item => ({
        ...item,
        features: Array.isArray(item.features) ? item.features.filter(f => typeof f === 'string') as string[] : [],
        color: item.color || 'blue',
        display_order: item.display_order || 0,
        popular: item.popular || false,
        exclusive: item.exclusive || false,
        description: item.description || undefined
      })));
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Failed to load license categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setFormData({
      category_number: Math.max(...categories.map(c => c.category_number), 0) + 1,
      name: '',
      price: '',
      min_volume: '',
      validity_period_months: 12,
      available: true,
      features: [],
      icon: 'Shield',
      color: 'blue',
      display_order: Math.max(...categories.map(c => c.display_order), 0) + 1,
      popular: false,
      exclusive: false,
      description: ''
    });
    setFeaturesInput('');
    setDialogOpen(true);
  };

  const handleEditCategory = (category: LicenseCategory) => {
    setEditingCategory(category);
    setFormData({
      category_number: category.category_number,
      name: category.name,
      price: category.price,
      min_volume: category.min_volume,
      validity_period_months: category.validity_period_months,
      available: category.available,
      features: category.features,
      icon: category.icon,
      color: category.color,
      display_order: category.display_order,
      popular: category.popular,
      exclusive: category.exclusive,
      description: category.description || ''
    });
    setFeaturesInput(category.features.join('\n'));
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const features = featuresInput.split('\n').filter(f => f.trim()).map(f => f.trim());
      
      const categoryData = {
        ...formData,
        features
      };

      if (editingCategory) {
        const result = await supabaseDataManager.updateLicenseCategory(editingCategory.id, categoryData);
        if (result) {
          toast.success('License category updated successfully');
        } else {
          throw new Error('Failed to update category');
        }
      } else {
        const result = await supabaseDataManager.createLicenseCategory(categoryData);
        if (result) {
          toast.success('License category created successfully');
        } else {
          throw new Error('Failed to create category');
        }
      }

      setDialogOpen(false);
      loadCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save license category');
    }
  };

  const handleDeleteCategory = async (category: LicenseCategory) => {
    if (!confirm(`Are you sure you want to delete "${category.name}"?`)) return;

    try {
      const result = await supabaseDataManager.deleteLicenseCategory(category.id);
      if (result) {
        toast.success('License category deleted successfully');
        loadCategories();
      } else {
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete license category');
    }
  };

  const toggleAvailability = async (category: LicenseCategory) => {
    try {
      const result = await supabaseDataManager.updateLicenseCategory(category.id, { 
        available: !category.available 
      });
      if (result) {
        toast.success(`Category ${!category.available ? 'enabled' : 'disabled'} successfully`);
        loadCategories();
      } else {
        throw new Error('Failed to update availability');
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast.error('Failed to update category availability');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">License Categories</h2>
          <p className="text-muted-foreground">Manage pricing, availability, and features for license categories</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateCategory}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit License Category' : 'Create License Category'}
              </DialogTitle>
              <DialogDescription>
                Configure the details for this license category
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category_number">Category Number</Label>
                  <Input
                    id="category_number"
                    type="number"
                    value={formData.category_number}
                    onChange={(e) => setFormData({ ...formData, category_number: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Professional Trader"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., 100,000 USDT"
                  />
                </div>
                <div>
                  <Label htmlFor="min_volume">Minimum Volume</Label>
                  <Input
                    id="min_volume"
                    value={formData.min_volume}
                    onChange={(e) => setFormData({ ...formData, min_volume: e.target.value })}
                    placeholder="e.g., $500,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLOR_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="1-year validity period&#10;Enhanced verification process&#10;Priority support"
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional description for this category"
                />
              </div>

              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={formData.available}
                    onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                  />
                  <Label htmlFor="available">Available</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="popular"
                    checked={formData.popular}
                    onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
                  />
                  <Label htmlFor="popular">Popular</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="exclusive"
                    checked={formData.exclusive}
                    onCheckedChange={(checked) => setFormData({ ...formData, exclusive: checked })}
                  />
                  <Label htmlFor="exclusive">Exclusive</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  {editingCategory ? 'Update' : 'Create'} Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories ({categories.length})</CardTitle>
          <CardDescription>
            Manage license categories, pricing, and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Min Volume</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Badges</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <Badge variant="outline">#{category.category_number}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.price}</TableCell>
                  <TableCell>{category.min_volume}</TableCell>
                  <TableCell>
                    <Badge variant={category.available ? 'default' : 'destructive'}>
                      {category.available ? 'Available' : 'Sold Out'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {category.popular && <Badge variant="secondary">Popular</Badge>}
                      {category.exclusive && <Badge variant="outline">Exclusive</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAvailability(category)}
                      >
                        {category.available ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCategory(category)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LicenseCategoriesManager;