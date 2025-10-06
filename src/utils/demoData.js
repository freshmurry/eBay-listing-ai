// Demo data utilities for the standalone app
export const initializeDemoData = () => {
  // Check if demo data already exists
  if (localStorage.getItem('demoDataInitialized') === 'true') {
    return;
  }

  // Create sample listing projects
  const sampleProjects = [
    {
      id: "project-demo-1",
      title: "Vintage Leather Wallet",
      description: "Handcrafted genuine leather wallet with multiple card slots and a coin pocket. Perfect for everyday use.",
      status: "DRAFT",
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      price: 45.99,
      category: "Fashion",
      images: [
        "https://via.placeholder.com/400x300?text=Leather+Wallet"
      ]
    },
    {
      id: "project-demo-2", 
      title: "Wireless Bluetooth Headphones",
      description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
      status: "PUBLISHED",
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      price: 129.99,
      category: "Electronics",
      images: [
        "https://via.placeholder.com/400x300?text=Bluetooth+Headphones"
      ]
    },
    {
      id: "project-demo-3",
      title: "Ceramic Coffee Mug Set",
      description: "Set of 4 hand-painted ceramic mugs. Microwave and dishwasher safe.",
      status: "DRAFT",
      createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      price: 24.99,
      category: "Home & Garden",
      images: [
        "https://via.placeholder.com/400x300?text=Coffee+Mug+Set"
      ]
    }
  ];

  // Store sample projects
  localStorage.setItem('listingProjects', JSON.stringify(sampleProjects));

  // Create mock user if not exists
  if (!localStorage.getItem('mockUser')) {
    const mockUser = {
      id: "user-demo",
      name: "Demo User",
      email: "demo@example.com",
      avatarUrl: "https://via.placeholder.com/40x40?text=DU",
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
  }

  // Mark demo data as initialized
  localStorage.setItem('demoDataInitialized', 'true');
};

export const clearDemoData = () => {
  localStorage.removeItem('listingProjects');
  localStorage.removeItem('mockUser');
  localStorage.removeItem('demoDataInitialized');
};

export const resetDemoData = () => {
  clearDemoData();
  initializeDemoData();
};