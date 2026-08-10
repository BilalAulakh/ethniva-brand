'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, Package, Clock, Phone, MapPin, Search, RefreshCw, 
  Plus, Edit, Trash2, Image as ImageIcon, Lock, LogOut, CheckCircle, 
  AlertCircle, ChevronRight, Eye, Tag, DollarSign, Layers, Check, 
  UploadCloud, X, ArrowUpRight, BarChart3, Filter, Copy, KeyRound, Sparkles
} from 'lucide-react';
import { 
  getProducts, getOrders, addProduct, updateProduct, deleteProduct, 
  updateOrderStatus, deleteOrder, Product, Order 
} from '@/lib/supabase';
import { TableSkeleton, OrderSkeleton, ShimmerBox } from '@/components/Shimmer';

// Admin Credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@zehrastudio.pk',
  altEmail: 'admin@reetwear.pk',
  password: 'admin12345',
  pin: '7860'
};

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Tab State: 'orders' | 'products' | 'analytics'
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'analytics'>('products');

  // Data States
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    slug: '',
    price: '',
    compare_at_price: '',
    category: 'Luxury Pret',
    fabric: 'Pure Silk & Handmade Adda Work',
    description: '',
    sizes: ['XS', 'Small', 'Medium', 'Large', 'XL'],
    images: [] as string[],
    is_featured: false,
    is_new: true
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Selected Order for Modal
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Check Local Authentication Session
  useEffect(() => {
    try {
      const session = localStorage.getItem('zehra_admin_auth');
      if (session === 'authenticated_true') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // Load Data
  const loadData = async () => {
    setLoading(true);
    try {
      const [orderList, prodList] = await Promise.all([
        getOrders(),
        getProducts()
      ]);
      setOrders(orderList);
      setProducts(prodList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Flash Notification Helper
  const showFlash = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    if (
      (cleanEmail === ADMIN_CREDENTIALS.email || cleanEmail === ADMIN_CREDENTIALS.altEmail || cleanEmail === 'admin') &&
      (cleanPass === ADMIN_CREDENTIALS.password || cleanPass === ADMIN_CREDENTIALS.pin)
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('zehra_admin_auth', 'authenticated_true');
      showFlash('Welcome, Administrator! Authenticated successfully.');
    } else {
      setLoginError('Invalid credentials. Please use the demo credentials provided below.');
    }
  };

  // Quick 1-Click Login Helper
  const fillDemoCredentials = () => {
    setLoginEmail(ADMIN_CREDENTIALS.email);
    setLoginPassword(ADMIN_CREDENTIALS.password);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('zehra_admin_auth');
    showFlash('Signed out successfully.');
  };

  // Handle File Upload (Convert to Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProductForm(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string]
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle Add Image URL
  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setProductForm(prev => ({
      ...prev,
      images: [...prev.images, newImageUrl.trim()]
    }));
    setNewImageUrl('');
  };

  // Remove Image from Form
  const handleRemoveImage = (indexToRemove: number) => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Open Modal for Create or Edit
  const openProductModal = (prodToEdit?: Product) => {
    if (prodToEdit) {
      setEditingProduct(prodToEdit);
      setProductForm({
        title: prodToEdit.title,
        slug: prodToEdit.slug,
        price: String(prodToEdit.price),
        compare_at_price: String(prodToEdit.compare_at_price || ''),
        category: prodToEdit.category,
        fabric: prodToEdit.fabric || '',
        description: prodToEdit.description || '',
        sizes: prodToEdit.sizes || ['XS', 'Small', 'Medium', 'Large', 'XL'],
        images: [...prodToEdit.images],
        is_featured: !!prodToEdit.is_featured,
        is_new: !!prodToEdit.is_new
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        title: '',
        slug: '',
        price: '',
        compare_at_price: '',
        category: 'Luxury Pret',
        fabric: 'Pure Chermouse Silk & Adda Work',
        description: 'Exquisite handcrafted formal ensemble with intricate hand embroidery and fine silk finish. Includes 1PC Shirt, 1PC Trouser/Sharara, 1PC Dupatta.',
        sizes: ['XS', 'Small', 'Medium', 'Large', 'XL'],
        images: [],
        is_featured: true,
        is_new: true
      });
    }
    setIsProductModalOpen(true);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title.trim()) {
      showFlash('Please enter a product title', 'error');
      return;
    }
    if (!productForm.price || isNaN(Number(productForm.price))) {
      showFlash('Please enter a valid price in PKR', 'error');
      return;
    }
    if (productForm.images.length === 0) {
      showFlash('Please add or upload at least 1 image for the product', 'error');
      return;
    }

    const finalSlug = productForm.slug.trim() 
      ? productForm.slug.trim() 
      : productForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : 'prod-' + Date.now(),
      title: productForm.title.trim(),
      slug: finalSlug,
      price: parseFloat(productForm.price),
      compare_at_price: productForm.compare_at_price ? parseFloat(productForm.compare_at_price) : undefined,
      category: productForm.category,
      fabric: productForm.fabric,
      description: productForm.description,
      sizes: productForm.sizes,
      images: productForm.images,
      is_featured: productForm.is_featured,
      is_new: productForm.is_new,
      rating: editingProduct?.rating || 4.9,
      reviews_count: editingProduct?.reviews_count || 12
    };

    if (editingProduct) {
      await updateProduct(productPayload);
      showFlash(`Product "${productPayload.title}" updated successfully!`);
    } else {
      await addProduct(productPayload);
      showFlash(`New product "${productPayload.title}" added to store catalog!`);
    }

    setIsProductModalOpen(false);
    loadData();
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the store?`)) {
      await deleteProduct(id);
      showFlash(`Product "${title}" removed.`);
      loadData();
    }
  };

  // Handle Status Update
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
    showFlash(`Order #${orderId} status updated to ${newStatus.toUpperCase()}`);
    loadData();
  };

  // Handle Delete Order
  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm(`Delete order #${orderId}?`)) {
      await deleteOrder(orderId);
      showFlash(`Order #${orderId} deleted.`);
      loadData();
    }
  };

  // Size toggle in Form
  const toggleSize = (size: string) => {
    setProductForm(prev => {
      const exists = prev.sizes.includes(size);
      if (exists) {
        return { ...prev, sizes: prev.sizes.filter(s => s !== size) };
      } else {
        return { ...prev, sizes: [...prev.sizes, size] };
      }
    });
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'all' || 
                            p.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Filtered Orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = (order.id && order.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer_phone.includes(searchTerm) ||
                          order.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || (order.status || 'pending').toLowerCase() === orderStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Calculations for Analytics
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
  const pendingOrdersCount = orders.filter(o => !o.status || o.status === 'pending').length;
  const completedOrdersCount = orders.filter(o => o.status === 'delivered').length;

  // Categories list
  const categoryOptions = [
    'Bridal & Formals',
    'Velvet & Silk Couture',
    'Chiffon & Organza Formals',
    'Luxury Pret',
    'Pret & Co-Ords',
    'Silk Formals',
    'Maxy Formals'
  ];

  // -------------------------------------------------------------
  // 1. LOGIN SCREEN (If not authenticated)
  // -------------------------------------------------------------
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#881337] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-[#F4EFE6] to-[#ECE3D2] flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl border border-[#E8DFC8] shadow-2xl p-8 sm:p-10 space-y-8 animate-fade-in relative overflow-hidden">
          
          {/* Top Gold Ornament */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C7A76C] via-[#881337] to-[#C7A76C]" />

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#881337] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#881337]/20">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-black text-[#C7A76C] uppercase tracking-[0.3em] block">
              AUTHENTICATION REQUIRED
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#18181B]">
              Store Admin Portal
            </h1>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Sign in with your master administrator credentials to manage products, images, and live customer orders.
            </p>
          </div>

          {/* Notification / Error */}
          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                Admin Email / Username
              </label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="admin@zehrastudio.pk"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#881337] rounded-xl text-xs text-[#18181B] focus:outline-none transition-all font-medium"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                  Master Password / PIN
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] text-[#881337] font-semibold hover:underline"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#881337] rounded-xl text-xs text-[#18181B] focus:outline-none transition-all font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#881337] hover:bg-[#6b0f2b] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#881337]/30 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" /> Sign In To Dashboard
            </button>
          </form>

          {/* Quick Credentials Info Box */}
          <div className="bg-[#FAF7F2] border border-[#E8DFC8] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-[#881337] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C7A76C]" />
                <span>Admin Login Credentials</span>
              </div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-[10px] font-bold text-[#881337] bg-white border border-[#C7A76C]/40 px-2 py-0.5 rounded-md hover:bg-[#881337] hover:text-white transition-all shadow-2xs"
              >
                1-Click Auto Fill
              </button>
            </div>

            <div className="text-[11px] space-y-1 font-mono text-stone-700 bg-white/70 p-2.5 rounded-lg border border-stone-200/60">
              <div className="flex justify-between">
                <span className="text-stone-400">Email:</span>
                <span className="font-bold text-[#18181B]">{ADMIN_CREDENTIALS.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Password:</span>
                <span className="font-bold text-[#18181B]">{ADMIN_CREDENTIALS.password}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-100 text-[10px]">
                <span className="text-stone-400">Quick PIN:</span>
                <span className="font-bold text-[#881337]">{ADMIN_CREDENTIALS.pin}</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-stone-500 hover:text-[#881337] font-medium transition-colors">
              &larr; Back to Online Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="bg-[#FAF9F6] text-[#18181B] min-h-screen font-sans pb-24">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2.5 animate-slide-down ${
          notification.type === 'success' 
            ? 'bg-[#18181B] text-white border border-[#C7A76C]' 
            : 'bg-rose-900 text-white border border-rose-600'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#881337] text-white font-serif font-black text-xs flex items-center justify-center shadow-xs">
                ZS
              </div>
              <span className="font-serif font-bold text-lg tracking-wider text-[#18181B] hidden sm:inline">
                ZEHRA STUDIO &bull; ADMIN
              </span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl border border-stone-200 hover:border-[#881337] text-xs font-bold text-stone-700 hover:text-[#881337] flex items-center gap-1.5 transition-all bg-white"
            >
              <span>View Storefront</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-all border border-stone-200"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header & Quick Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="text-[10px] font-black text-[#881337] uppercase tracking-[0.3em] flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#C7A76C]" />
              <span>COUTURE MANAGEMENT HUB</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif italic font-extrabold text-[#18181B]">
              Store Administration &amp; Inventory
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={loadData}
              className="px-4 py-2 bg-white border border-stone-300 hover:border-[#C7A76C] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#881337] ${loading ? 'animate-spin' : ''}`} /> 
              <span>Refresh Data</span>
            </button>

            <button
              onClick={() => openProductModal()}
              className="px-5 py-2.5 bg-[#881337] hover:bg-[#6b0f2b] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" /> Add New Article
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
            <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center justify-between">
              <span>TOTAL PRODUCTS</span>
              <Package className="w-4 h-4 text-[#C7A76C]" />
            </div>
            <div className="text-2xl font-serif font-black text-[#18181B]">{products.length}</div>
            <div className="text-[11px] text-stone-500 font-medium">Active in store catalog</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
            <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center justify-between">
              <span>TOTAL ORDERS</span>
              <Layers className="w-4 h-4 text-[#881337]" />
            </div>
            <div className="text-2xl font-serif font-black text-[#18181B]">{orders.length}</div>
            <div className="text-[11px] text-stone-500 font-medium">{pendingOrdersCount} pending dispatch</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
            <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center justify-between">
              <span>GROSS SALES (PKR)</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-serif font-black text-emerald-700">
              RS. {totalRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500 font-medium">From received orders</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
            <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center justify-between">
              <span>SYSTEM STATUS</span>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-sm font-bold text-[#18181B] pt-1">Online &amp; Synced</div>
            <div className="text-[11px] text-stone-500 font-medium">LocalStorage + Supabase</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 gap-8 text-xs font-black uppercase tracking-wider">
          <button
            onClick={() => { setActiveTab('products'); setSearchTerm(''); }}
            className={`pb-3 relative transition-colors flex items-center gap-2 ${
              activeTab === 'products' ? 'text-[#881337]' : 'text-stone-400 hover:text-stone-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog &amp; Images ({products.length})</span>
            {activeTab === 'products' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#881337]" />
            )}
          </button>

          <button
            onClick={() => { setActiveTab('orders'); setSearchTerm(''); }}
            className={`pb-3 relative transition-colors flex items-center gap-2 ${
              activeTab === 'orders' ? 'text-[#881337]' : 'text-stone-400 hover:text-stone-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#881337] text-white text-[9px] flex items-center justify-center font-mono">
                {pendingOrdersCount}
              </span>
            )}
            {activeTab === 'orders' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#881337]" />
            )}
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-stone-200 shadow-xs">
            <Search className="w-4 h-4 text-stone-400 flex-shrink-0" />
            <input
              type="text"
              placeholder={activeTab === 'products' ? "Search products by title, category, fabric, or slug..." : "Search orders by ID, customer name, phone, city..."}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-transparent border-none text-xs text-[#18181B] focus:outline-none w-full font-medium"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-stone-400 hover:text-stone-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {activeTab === 'products' && (
            <select
              value={selectedCategoryFilter}
              onChange={e => setSelectedCategoryFilter(e.target.value)}
              className="bg-white border border-stone-200 rounded-2xl px-4 py-3 text-xs font-bold text-[#18181B] focus:outline-none focus:border-[#881337] shadow-xs"
            >
              <option value="all">All Categories ({products.length})</option>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}

          {activeTab === 'orders' && (
            <select
              value={orderStatusFilter}
              onChange={e => setOrderStatusFilter(e.target.value)}
              className="bg-white border border-stone-200 rounded-2xl px-4 py-3 text-xs font-bold text-[#18181B] focus:outline-none focus:border-[#881337] shadow-xs"
            >
              <option value="all">All Statuses ({orders.length})</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: PRODUCT CATALOG & IMAGE MANAGEMENT                     */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {loading ? (
              <TableSkeleton rows={8} />
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-3">
                <Package className="w-12 h-12 text-stone-400 mx-auto" />
                <h3 className="text-sm font-bold text-[#18181B]">No products match your search query</h3>
                <button
                  onClick={() => openProductModal()}
                  className="px-4 py-2 bg-[#881337] text-white text-xs font-bold rounded-xl"
                >
                  + Add First Product
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF7F2] border-b border-stone-200 text-stone-500 font-extrabold text-[10px] uppercase tracking-wider">
                      <tr>
                        <th className="py-4 px-4 sm:px-6">Article</th>
                        <th className="py-4 px-4">Category &amp; Fabric</th>
                        <th className="py-4 px-4">Price (PKR)</th>
                        <th className="py-4 px-4">Gallery</th>
                        <th className="py-4 px-4">Badges</th>
                        <th className="py-4 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredProducts.map(product => (
                        <tr key={product.id} className="hover:bg-stone-50/70 transition-colors group">
                          {/* Image & Title */}
                          <td className="py-3.5 px-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-16 rounded-xl bg-stone-100 overflow-hidden relative border border-stone-200 flex-shrink-0">
                                {product.images && product.images[0] ? (
                                  <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                                    <ImageIcon className="w-5 h-5" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="font-extrabold text-[#18181B] text-sm group-hover:text-[#881337] transition-colors">
                                  {product.title}
                                </div>
                                <div className="text-[10px] text-stone-400 font-mono">
                                  slug: {product.slug}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category & Fabric */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#18181B]">{product.category}</div>
                            <div className="text-[11px] text-stone-500 line-clamp-1 max-w-[200px]">
                              {product.fabric || 'Pure Fabric'}
                            </div>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4 font-mono font-extrabold text-[#881337]">
                            <div>RS. {product.price.toLocaleString()}</div>
                            {product.compare_at_price && (
                              <div className="text-[10px] text-stone-400 line-through">
                                RS. {product.compare_at_price.toLocaleString()}
                              </div>
                            )}
                          </td>

                          {/* Gallery count */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1">
                              <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E8DFC8] text-[10px] font-bold text-[#785E2F] flex items-center gap-1">
                                <ImageIcon className="w-3 h-3" />
                                {product.images?.length || 0} photos
                              </span>
                            </div>
                          </td>

                          {/* Badges */}
                          <td className="py-3.5 px-4">
                            <div className="flex gap-1.5 flex-wrap">
                              {product.is_featured && (
                                <span className="bg-[#FAF7F2] text-[#881337] border border-[#E8DFC8] text-[9px] font-black uppercase px-2 py-0.5 rounded">
                                  Featured
                                </span>
                              )}
                              {product.is_new && (
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-black uppercase px-2 py-0.5 rounded">
                                  New
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/product/${product.slug}`}
                                target="_blank"
                                className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
                                title="View on Live Store"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              
                              <button
                                onClick={() => openProductModal(product)}
                                className="p-1.5 text-stone-600 hover:text-[#881337] rounded-lg hover:bg-stone-100 transition-colors"
                                title="Edit Product"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDeleteProduct(product.id, product.title)}
                                className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: LIVE CUSTOMER ORDERS MANAGEMENT                        */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {loading ? (
              <OrderSkeleton count={4} />
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-3">
                <Package className="w-12 h-12 text-[#881337] mx-auto opacity-70" />
                <h3 className="text-sm font-extrabold text-[#18181B]">No orders found</h3>
                <p className="text-xs text-stone-500">
                  {searchTerm || orderStatusFilter !== 'all' ? 'Try adjusting your search filters.' : 'Orders placed on checkout will appear here in real time.'}
                </p>
                <Link href="/checkout" className="inline-block bg-[#881337] text-white text-xs font-black px-6 py-2.5 rounded-full uppercase tracking-wider shadow-md">
                  + Create Test Checkout Order
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order, idx) => (
                  <div key={order.id || idx} className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-black text-[#18181B]">
                          ORDER #{order.id}
                        </span>
                        <span className="text-xs text-stone-400">
                          {order.created_at ? new Date(order.created_at).toLocaleString() : 'Just now'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status update select */}
                        <select
                          value={order.status || 'pending'}
                          onChange={e => order.id && handleStatusChange(order.id, e.target.value)}
                          className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FAF7F2] text-[#881337] border border-[#E8DFC8] focus:outline-none cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#881337] text-white">
                          {order.payment_method === 'cod' ? 'COD' : 'Bank Transfer'}
                        </span>

                        <button
                          onClick={() => order.id && handleDeleteOrder(order.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          title="Delete Order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <div className="text-stone-400 font-extrabold text-[10px] uppercase tracking-wider mb-1">Customer Details</div>
                        <div className="font-black text-[#18181B] text-sm">{order.customer_name}</div>
                        <div className="text-stone-700 flex items-center gap-1 mt-0.5 font-medium">
                          <Phone className="w-3.5 h-3.5 text-[#881337]" /> {order.customer_phone}
                        </div>
                        {order.customer_email && <div className="text-stone-500">{order.customer_email}</div>}
                      </div>

                      <div>
                        <div className="text-stone-400 font-extrabold text-[10px] uppercase tracking-wider mb-1">Delivery Destination</div>
                        <div className="font-extrabold text-[#18181B] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#881337]" /> {order.city}, Pakistan
                        </div>
                        <div className="text-stone-600 mt-0.5 leading-tight font-light">{order.address}</div>
                      </div>

                      <div className="md:text-right">
                        <div className="text-stone-400 font-extrabold text-[10px] uppercase tracking-wider mb-1">Total Payable Amount</div>
                        <div className="text-2xl font-serif font-black text-[#881337]">
                          RS. {order.total_amount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-stone-500 font-black uppercase tracking-wider mt-0.5">
                          {order.items.length} Items Ordered
                        </div>
                      </div>
                    </div>

                    {/* Order Items Breakdown */}
                    <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 text-xs flex gap-3 items-center">
                          <div className="w-10 h-12 bg-white rounded-xl overflow-hidden flex-shrink-0 relative border border-stone-200">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-extrabold text-[#18181B] line-clamp-1">{item.title}</div>
                            <div className="text-[10px] text-stone-600">
                              Size: <strong className="text-[#881337]">{item.selected_size}</strong> &bull; Qty: {item.quantity}
                            </div>
                            {item.custom_measurements && (
                              <div className="text-[9px] text-stone-500 italic">Custom: {item.custom_measurements}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. ADD / EDIT PRODUCT MODAL (WITH IMAGE UPLOAD)               */}
      {/* ------------------------------------------------------------- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 animate-scale-in">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-black text-[#C7A76C] uppercase tracking-widest block">
                  {editingProduct ? 'EDIT ARTICLE' : 'NEW PRODUCT CREATION'}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif italic font-bold text-[#18181B]">
                  {editingProduct ? `Edit "${editingProduct.title}"` : 'Add New Couture Article'}
                </h2>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SHAHEE BLUE"
                    value={productForm.title}
                    onChange={e => {
                      const val = e.target.value;
                      setProductForm(prev => ({
                        ...prev,
                        title: val,
                        slug: prev.slug || val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      }));
                    }}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-[#18181B] focus:border-[#881337] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. shahee-blue"
                    value={productForm.slug}
                    onChange={e => setProductForm(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-[#18181B] focus:border-[#881337] focus:outline-none"
                  />
                </div>
              </div>

              {/* Price & Compare at Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                    Selling Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="10500"
                    value={productForm.price}
                    onChange={e => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-[#881337] focus:border-[#881337] focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                    Original Price (Compare At)
                  </label>
                  <input
                    type="number"
                    placeholder="18500"
                    value={productForm.compare_at_price}
                    onChange={e => setProductForm(prev => ({ ...prev, compare_at_price: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-500 focus:border-[#881337] focus:outline-none"
                  />
                </div>
              </div>

              {/* Category & Fabric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                    Collection / Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-[#18181B] focus:border-[#881337] focus:outline-none"
                  >
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                    Fabric &amp; Craft Details
                  </label>
                  <input
                    type="text"
                    placeholder="Pure Chermouse Silk & Handmade Adda Work"
                    value={productForm.fabric}
                    onChange={e => setProductForm(prev => ({ ...prev, fabric: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-[#18181B] focus:border-[#881337] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                  Product Description &amp; Package Details
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={e => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Includes 1PC Shirt, 1PC Sharara, 1PC Dupatta. Pure silk with handcrafted beadwork."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-[#18181B] focus:border-[#881337] focus:outline-none"
                />
              </div>

              {/* Available Sizes */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider block">
                  Available Sizes
                </label>
                <div className="flex gap-2 flex-wrap">
                  {['UNSTITCHED', 'XS', 'Small', 'Medium', 'Large', 'XL', 'Custom Stitching'].map(size => {
                    const isSelected = productForm.sizes.includes(size);
                    return (
                      <button
                        type="button"
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          isSelected 
                            ? 'bg-[#881337] text-white border-[#881337]' 
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* IMAGE UPLOAD & GALLERY SECTION                                */}
              {/* ------------------------------------------------------------- */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <label className="text-[11px] font-black text-[#881337] uppercase tracking-wider block flex items-center justify-between">
                  <span>Product Photos &amp; Image Gallery *</span>
                  <span className="text-[10px] text-stone-400 font-normal">
                    {productForm.images.length} photos selected
                  </span>
                </label>

                {/* Upload Options Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 1. Local File Upload */}
                  <div className="p-4 border-2 border-dashed border-stone-300 hover:border-[#881337] rounded-2xl text-center space-y-2 bg-[#FAF7F2]/60 transition-colors">
                    <UploadCloud className="w-6 h-6 text-[#881337] mx-auto" />
                    <div className="text-xs font-bold text-[#18181B]">Upload from Device</div>
                    <p className="text-[10px] text-stone-500">Supports JPG, PNG, WEBP</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="device-image-upload"
                    />
                    <label
                      htmlFor="device-image-upload"
                      className="inline-block px-3 py-1.5 bg-white border border-stone-300 hover:border-[#881337] text-[#881337] text-xs font-bold rounded-lg cursor-pointer shadow-2xs transition-all"
                    >
                      Browse Files
                    </label>
                  </div>

                  {/* 2. Direct Web URL Paste */}
                  <div className="p-4 border border-stone-200 rounded-2xl space-y-2 bg-stone-50/70">
                    <div className="text-xs font-bold text-[#18181B] flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5 text-[#C7A76C]" />
                      <span>Paste Image URL</span>
                    </div>
                    <p className="text-[10px] text-stone-500">Shopify CDN, Unsplash, or Web URL</p>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        placeholder="https://cdn.shopify.com/..."
                        value={newImageUrl}
                        onChange={e => setNewImageUrl(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-[#881337]"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-3 py-1.5 bg-[#881337] text-white text-xs font-bold rounded-lg hover:bg-[#6b0f2b] transition-all flex-shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Thumbnails Gallery Preview */}
                {productForm.images.length > 0 ? (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 pt-2">
                    {productForm.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-stone-200 group bg-stone-100 shadow-2xs">
                        <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 bg-[#881337] text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow">
                            MAIN
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                          title="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-stone-400 text-xs italic bg-stone-50 rounded-xl border border-stone-200">
                    No images added yet. Upload from device or paste a URL above.
                  </div>
                )}
              </div>

              {/* Toggles (Featured & New) */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={productForm.is_featured}
                    onChange={e => setProductForm(prev => ({ ...prev, is_featured: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#881337] focus:ring-[#881337]"
                  />
                  <span>Mark as Featured (Hero / Highlights)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={productForm.is_new}
                    onChange={e => setProductForm(prev => ({ ...prev, is_new: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#881337] focus:ring-[#881337]"
                  />
                  <span>Show New Arrival Badge</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#881337] hover:bg-[#6b0f2b] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
