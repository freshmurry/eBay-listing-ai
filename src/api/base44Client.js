// Hybrid client that works both in browser (with mocks) and Cloudflare Workers (with real APIs)

const isWorkerEnvironment = typeof caches !== 'undefined' && typeof Request !== 'undefined' && typeof Response !== 'undefined';
const isBrowserEnvironment = typeof window !== 'undefined';

// Browser-side API client that calls Worker functions
const callWorkerAPI = async (endpoint, params) => {
  if (!isBrowserEnvironment) return null;
  
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
    
    if (endpoint === 'screenshot') {
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return { success: true, url, blob };
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Worker API call failed for ${endpoint}:`, error);
    // Fallback to mock for development
    return null;
  }
};

export const base44 = {
  integrations: {
    Core: {
      InvokeLLM: async (params) => {
        // Try real Workers AI first, fallback to mock
        const workerResult = await callWorkerAPI('llm', params);
        if (workerResult && workerResult.success) {
          return workerResult;
        }
        
        // Mock fallback
        console.log('Mock LLM called with:', params);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
          result: "This is a mock AI response. In production, this would integrate with advanced AI to generate compelling eBay listing descriptions.",
          success: true
        };
      },
      
      SendEmail: async (params) => {
        console.log('Mock SendEmail called with:', params);
        return { success: true, message: "Email sent successfully (mock)" };
      },
      
      UploadFile: async (params) => {
        console.log('Mock UploadFile called with:', params);
        
        // Validate input
        if (!params || !params.file) {
          console.error('No file provided to UploadFile');
          return { success: false, error: 'No file provided' };
        }
        
        const file = params.file;
        console.log('Processing file:', { name: file.name, size: file.size, type: file.type });
        
        // Check if it's an image
        if (!file.type.startsWith('image/')) {
          console.error('File is not an image:', file.type);
          return { success: false, error: 'File must be an image' };
        }
        
        // Simulate a realistic upload delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Create a blob URL for the uploaded file (for development)
        let imageUrl = "https://via.placeholder.com/400x300?text=Uploaded+Image";
        if (typeof URL !== 'undefined' && URL.createObjectURL) {
          try {
            imageUrl = URL.createObjectURL(file);
            console.log('Created blob URL:', imageUrl);
          } catch (error) {
            console.warn('Could not create blob URL, using placeholder:', error);
          }
        }
        
        return { 
          success: true, 
          url: imageUrl,
          file_url: imageUrl, // Also provide this as fallback
          id: "mock-file-" + Date.now(),
          filename: file.name,
          size: file.size,
          type: file.type
        };
      },
      
      GenerateImage: async (params) => {
        // Try real Workers AI first, fallback to mock
        const workerResult = await callWorkerAPI('generate-image', params);
        if (workerResult && workerResult.success) {
          return workerResult;
        }
        
        // Mock fallback
        console.log('Mock GenerateImage called with:', params);
        return {
          success: true,
          url: "https://via.placeholder.com/400x300?text=AI+Generated+Image",
          id: "mock-image-" + Date.now()
        };
      },
      
      ExtractDataFromUploadedFile: async (params) => {
        // Try real Workers AI first, fallback to mock
        const workerResult = await callWorkerAPI('extract-file-data', params);
        if (workerResult && workerResult.success) {
          return workerResult;
        }
        
        // Mock fallback
        console.log('Mock ExtractDataFromUploadedFile called with:', params);
        return {
          success: true,
          data: {
            productName: "Sample Product",
            description: "This is extracted product data from the uploaded file",
            price: "$29.99",
            category: "Electronics"
          }
        };
      },
      
      CreateFileSignedUrl: async (params) => {
        console.log('Mock CreateFileSignedUrl called with:', params);
        return {
          success: true,
          signedUrl: "https://example.com/upload-url-" + Date.now(),
          fileId: "file-" + Date.now()
        };
      },
      
      UploadPrivateFile: async (params) => {
        console.log('Mock UploadPrivateFile called with:', params);
        return {
          success: true,
          fileId: "private-file-" + Date.now(),
          url: "https://example.com/private-file-url"
        };
      },
      
      // New Browser Rendering functions
      TakeScreenshot: async (params) => {
        const workerResult = await callWorkerAPI('screenshot', params);
        if (workerResult && workerResult.success) {
          return workerResult;
        }
        
        // Mock fallback
        console.log('Mock TakeScreenshot called with:', params);
        return {
          success: true,
          url: "https://via.placeholder.com/800x600?text=Screenshot",
          id: "screenshot-" + Date.now()
        };
      },
      
      ScrapeContent: async (params) => {
        const workerResult = await callWorkerAPI('scrape', params);
        if (workerResult && workerResult.success) {
          return workerResult;
        }
        
        // Mock fallback
        console.log('Mock ScrapeContent called with:', params);
        return {
          success: true,
          content: "This is mock scraped content from the webpage.",
          extractedAt: new Date().toISOString()
        };
      },
      
      ExtractLinks: async (params) => {
        const workerResult = await callWorkerAPI('extract-links', params);
        if (workerResult && workerResult.success) {
          return workerResult;
        }
        
        // Mock fallback
        console.log('Mock ExtractLinks called with:', params);
        return {
          success: true,
          links: [
            { href: "https://example.com/link1", text: "Example Link 1" },
            { href: "https://example.com/link2", text: "Example Link 2" }
          ],
          extractedAt: new Date().toISOString()
        };
      },
      
      ExtractPageContent: async (params) => {
        const workerResult = await callWorkerAPI('extract-content', params);
        if (workerResult && workerResult.success) {
          return workerResult;
        }
        
        // Mock fallback
        console.log('Mock ExtractPageContent called with:', params);
        return {
          success: true,
          content: {
            title: "Example Page",
            text: "This is mock extracted page content.",
            metadata: { url: params.url }
          },
          extractedAt: new Date().toISOString()
        };
      }
    }
  },
  entities: {
    ListingProject: {
      create: async (data) => {
        const project = {
          id: "project-" + Date.now(),
          title: data.title || "New Listing Project",
          description: data.description || "",
          status: "DRAFT",
          createdAt: new Date().toISOString(),
          ...data
        };
        const projects = JSON.parse(localStorage.getItem('listingProjects') || '[]');
        projects.push(project);
        localStorage.setItem('listingProjects', JSON.stringify(projects));
        return project;
      },
      findMany: async () => {
        return JSON.parse(localStorage.getItem('listingProjects') || '[]');
      },
      findById: async (id) => {
        const projects = JSON.parse(localStorage.getItem('listingProjects') || '[]');
        return projects.find(p => p.id === id);
      },
      update: async (id, data) => {
        const projects = JSON.parse(localStorage.getItem('listingProjects') || '[]');
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
          projects[index] = { ...projects[index], ...data };
          localStorage.setItem('listingProjects', JSON.stringify(projects));
          return projects[index];
        }
        return null;
      },
      delete: async (id) => {
        const projects = JSON.parse(localStorage.getItem('listingProjects') || '[]');
        const filtered = projects.filter(p => p.id !== id);
        localStorage.setItem('listingProjects', JSON.stringify(filtered));
        return { success: true };
      },
      // Backward compatibility aliases
      list: async (sortBy, limit) => {
        let projects = JSON.parse(localStorage.getItem('listingProjects') || '[]');
        
        // Ensure all projects have a created_date
        projects = projects.map(project => ({
          ...project,
          created_date: project.created_date || project.createdAt || new Date().toISOString()
        }));
        
        // Apply sorting
        if (sortBy) {
          const isDesc = sortBy.startsWith('-');
          const field = isDesc ? sortBy.substring(1) : sortBy;
          projects.sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            if (isDesc) {
              return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
            } else {
              return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            }
          });
        }
        
        return projects.slice(0, limit || projects.length);
      },
      get: async (id) => {
        const projects = JSON.parse(localStorage.getItem('listingProjects') || '[]');
        return projects.find(p => p.id === id);
      }
    },
    SellerProfile: {
      findMany: async () => {
        const profiles = JSON.parse(localStorage.getItem('sellerProfiles') || '[]');
        return profiles;
      },
      filter: async (criteria, sortBy = "-created_date", limit = null) => {
        const profiles = JSON.parse(localStorage.getItem('sellerProfiles') || '[]');
        let filtered = profiles;
        
        // Apply criteria filtering
        if (criteria && Object.keys(criteria).length > 0) {
          filtered = profiles.filter(profile => {
            return Object.entries(criteria).every(([key, value]) => {
              return profile[key] === value;
            });
          });
        }
        
        // Apply sorting
        if (sortBy) {
          const isDesc = sortBy.startsWith('-');
          const field = isDesc ? sortBy.substring(1) : sortBy;
          filtered.sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            if (isDesc) {
              return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
            } else {
              return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            }
          });
        }
        
        // Apply limit
        if (limit && limit > 0) {
          filtered = filtered.slice(0, limit);
        }
        
        return filtered;
      },
      create: async (data) => {
        const profiles = JSON.parse(localStorage.getItem('sellerProfiles') || '[]');
        const newProfile = {
          id: "profile-" + Date.now(),
          created_date: new Date().toISOString(),
          ...data
        };
        profiles.push(newProfile);
        localStorage.setItem('sellerProfiles', JSON.stringify(profiles));
        return newProfile;
      },
      update: async (id, data) => {
        const profiles = JSON.parse(localStorage.getItem('sellerProfiles') || '[]');
        const index = profiles.findIndex(p => p.id === id);
        if (index !== -1) {
          profiles[index] = { ...profiles[index], ...data };
          localStorage.setItem('sellerProfiles', JSON.stringify(profiles));
          return profiles[index];
        }
        throw new Error('Profile not found');
      }
    },
    UserSubscription: {
      findMany: async () => [],
      create: async (data) => ({ id: "subscription-" + Date.now(), ...data })
    }
  },
  auth: {
    me: async () => {
      const user = localStorage.getItem('mockUser');
      return user ? JSON.parse(user) : null;
    },
    login: async (email, password) => {
      // Mock authentication - in production, this would validate credentials
      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        // Demo credentials for testing
        if (email === "demo@example.com" && password === "demo123") {
          const mockUser = {
            id: "user-123",
            name: "Demo User",
            email: "demo@example.com",
            firstName: "Demo",
            lastName: "User",
            avatarUrl: "https://via.placeholder.com/40x40?text=DU",
            subscription: "free",
            createdAt: new Date().toISOString()
          };
          localStorage.setItem('mockUser', JSON.stringify(mockUser));
          return { success: true, user: mockUser };
        }
        
        // For demo purposes, accept any email/password combination
        const mockUser = {
          id: "user-" + Date.now(),
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          email: email,
          firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          lastName: "User",
          avatarUrl: `https://via.placeholder.com/40x40?text=${email.charAt(0).toUpperCase()}U`,
          subscription: "free",
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        return { success: true, user: mockUser };
      } catch (error) {
        return { success: false, error: "Login failed. Please try again." };
      }
    },
    signup: async (userData) => {
      // Mock signup - in production, this would create a new user account
      try {
        await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API delay
        
        // Check if email already exists (mock check)
        const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        if (existingUsers.find(u => u.email === userData.email)) {
          return { success: false, error: "An account with this email already exists." };
        }
        
        const newUser = {
          id: "user-" + Date.now(),
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          avatarUrl: `https://via.placeholder.com/40x40?text=${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`,
          subscription: "free", // Always start with free plan
          subscribeNewsletter: userData.subscribeNewsletter || false,
          createdAt: new Date().toISOString()
        };
        
        // Initialize user's subscription data
        const subscriptionData = {
          userId: newUser.id,
          plan: 'free',
          status: 'active',
          createdAt: newUser.createdAt,
          currentPeriodStart: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
          currentPeriodEnd: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString()
        };
        localStorage.setItem(`subscription_${newUser.id}`, JSON.stringify(subscriptionData));
        
        // Initialize user's usage data
        const today = new Date();
        const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
        const usageData = {
          userId: newUser.id,
          month: currentMonth,
          listingsGenerated: 0,
          aiRequestsMade: 0,
          lastReset: new Date(today.getFullYear(), today.getMonth(), 1).toISOString()
        };
        localStorage.setItem(`usage_${newUser.id}_${currentMonth}`, JSON.stringify(usageData));
        
        // Save user to mock database
        existingUsers.push(newUser);
        localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
        
        // Log user in automatically
        localStorage.setItem('mockUser', JSON.stringify(newUser));
        
        return { success: true, user: newUser };
      } catch (error) {
        return { success: false, error: "Account creation failed. Please try again." };
      }
    },
    logout: async () => {
      localStorage.removeItem('mockUser');
      return { success: true };
    },
    resetPassword: async (email) => {
      // Mock password reset
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, message: "Password reset instructions have been sent to your email." };
      } catch (error) {
        return { success: false, error: "Failed to send reset email. Please try again." };
      }
    },
    update: async (userId, updates) => {
      // Mock user update
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const currentUser = localStorage.getItem('mockUser');
        if (!currentUser) {
          throw new Error('No user logged in');
        }
        
        const user = JSON.parse(currentUser);
        if (user.id !== userId) {
          throw new Error('User ID mismatch');
        }
        
        // Update user data
        const updatedUser = { ...user, ...updates };
        
        // Handle full_name update
        if (updates.full_name) {
          const [firstName, ...lastNameParts] = updates.full_name.split(' ');
          updatedUser.firstName = firstName || user.firstName;
          updatedUser.lastName = lastNameParts.join(' ') || user.lastName;
          updatedUser.name = updates.full_name;
        }
        
        localStorage.setItem('mockUser', JSON.stringify(updatedUser));
        
        // Also update in the users list if it exists
        const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const userIndex = existingUsers.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          existingUsers[userIndex] = updatedUser;
          localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
        }
        
        return { success: true, user: updatedUser };
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    },
    updateMyUserData: async (updates) => {
      // Convenience method for updating current user
      const currentUser = localStorage.getItem('mockUser');
      if (!currentUser) {
        throw new Error('No user logged in');
      }
      
      const user = JSON.parse(currentUser);
      return base44.auth.update(user.id, updates);
    }
  }
};
