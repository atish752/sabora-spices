import { useState, useEffect, useCallback } from 'react';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  serverTimestamp,
  orderBy,
  query
} from 'firebase/firestore';

const LS_PRODUCTS_KEY = 'sabora_products_v3';
const LS_HERO_KEY = 'sabora_hero_slides_v3';
const LS_INQUIRIES_KEY = 'sabora_inquiries_v3';

export const DEFAULT_HERO_SLIDES = [
  {
    id: "slide-1",
    tag: "INDIA-BASED SOURCING & SUPPLY",
    title: "Whole Spices & Makhana.\nSourced with Purpose.",
    subtitle: "Specialising in whole green cardamom, whole turmeric fingers, and Makhana (Fox Nuts) for domestic and international business buyers.",
    image: "/images/hero-sabora-master.jpg",
    badge: "Direct Sourcing & Export Ready",
    primaryCtaText: "Request Wholesale Quote",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Products",
    secondaryCtaLink: "/products",
    displayMode: "cinematic",
    showOverlayText: true,
    fitMode: "cover"
  },
  {
    id: "slide-2",
    tag: "CORE CATEGORIES",
    title: "Whole Green Cardamom & Makhana\nPure Agricultural Sourcing",
    subtitle: "Kerala cardamom and Bihar wetland Makhana pops in food-grade barrier pouches and bulk export packaging.",
    image: "/images/hero-sabora-pouches.jpg",
    badge: "100% Natural Whole Products",
    primaryCtaText: "Explore Products",
    primaryCtaLink: "/products",
    secondaryCtaText: "WhatsApp Sourcing Desk",
    secondaryCtaLink: "whatsapp",
    displayMode: "cinematic",
    showOverlayText: true,
    fitMode: "cover"
  },
  {
    id: "slide-3",
    tag: "KERALA & WESTERN GHATS ORIGIN",
    title: "Whole Green Cardamom\nSelected for Quality.",
    subtitle: "Sourced from Kerala's recognized cardamom-growing regions (Idukki district). Hand-sorted for size, grade, appearance, and volatile oil aroma.",
    image: "/images/hero-cardamom-sorting.jpg",
    badge: "7.5mm & 8mm+ Extra Bold",
    primaryCtaText: "View Cardamom Specs",
    primaryCtaLink: "/products",
    secondaryCtaText: "WhatsApp Sourcing Desk",
    secondaryCtaLink: "whatsapp",
    displayMode: "cinematic",
    showOverlayText: true,
    fitMode: "cover"
  },
  {
    id: "slide-4",
    tag: "TESTED BEFORE DISPATCH",
    title: "Food Safety & Quality\nat Every Step.",
    subtitle: "Compliance with FSSAI regulations, ISO 9001 & ISO 22000 principles, accredited laboratory analysis, and FoSCoS portal reporting.",
    image: "/images/hero-cardamom-harvest.jpg",
    badge: "Batch Release Protocol",
    primaryCtaText: "Quality & Lab Testing",
    primaryCtaLink: "/lab-testing",
    secondaryCtaText: "Contact Us",
    secondaryCtaLink: "/contact",
    displayMode: "cinematic",
    showOverlayText: true,
    fitMode: "cover"
  }
];

export function useProducts() {
  // Load products from localStorage or default
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Failed reading products from localStorage", e);
    }
    return DEFAULT_PRODUCTS;
  });

  // Load hero slides from localStorage or default (ensuring edge-to-edge full width cover)
  const [heroSlides, setHeroSlides] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_HERO_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(slide => ({
            ...slide,
            fitMode: "cover"
          }));
        }
      }
    } catch (e) {
      console.warn("Failed reading hero slides from localStorage", e);
    }
    return DEFAULT_HERO_SLIDES.map(slide => ({ ...slide, fitMode: "cover" }));
  });

  // Load inquiries
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_INQUIRIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn("Failed reading inquiries from localStorage", e);
    }
    return [];
  });

  const [isLoadingFromFirebase, setIsLoadingFromFirebase] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState({ connected: false, message: 'Local Mode' });

  // Sync with Firebase Firestore on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchFromFirebase() {
      if (!db) {
        if (isMounted) setFirebaseStatus({ connected: false, message: 'Firebase DB not initialized (using local cache)' });
        return;
      }

      setIsLoadingFromFirebase(true);
      try {
        // 1. Fetch Products from Firestore
        const productsCol = collection(db, 'sabora_products');
        const prodSnap = await getDocs(productsCol);
        if (!prodSnap.empty && isMounted) {
          const remoteProducts = prodSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          if (remoteProducts.length > 0) {
            setProducts(remoteProducts);
            localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(remoteProducts));
          }
        }

        // 2. Fetch Hero Slides from Firestore
        const heroDoc = doc(db, 'sabora_settings', 'hero_slides');
        const heroSnap = await getDocs(collection(db, 'sabora_hero_slides'));
        if (!heroSnap.empty && isMounted) {
          const remoteSlides = heroSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          if (remoteSlides.length > 0) {
            setHeroSlides(remoteSlides);
            localStorage.setItem(LS_HERO_KEY, JSON.stringify(remoteSlides));
          }
        }

        // 3. Fetch Inquiries from Firestore
        try {
          const inqQuery = query(collection(db, 'sabora_inquiries'), orderBy('createdAt', 'desc'));
          const inqSnap = await getDocs(inqQuery);
          if (!inqSnap.empty && isMounted) {
            const remoteInquiries = inqSnap.docs.map(d => ({ 
              id: d.id, 
              ...d.data(),
              createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : d.data().createdAt || new Date().toISOString()
            }));
            setInquiries(remoteInquiries);
            localStorage.setItem(LS_INQUIRIES_KEY, JSON.stringify(remoteInquiries));
          }
        } catch (inqErr) {
          // May require index or permissions; silent fallback to local
        }

        if (isMounted) {
          setFirebaseStatus({ connected: true, message: 'Connected to Firebase' });
        }
      } catch (err) {
        console.warn("Firestore sync info (running happily in offline/cache mode):", err);
        if (isMounted) {
          setFirebaseStatus({ connected: false, message: 'Local storage active (Firebase synced on save)' });
        }
      } finally {
        if (isMounted) setIsLoadingFromFirebase(false);
      }
    }

    fetchFromFirebase();
    return () => { isMounted = false; };
  }, []);

  // Save products to state, localStorage, and Firestore
  const saveProducts = useCallback(async (newProducts) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(newProducts));
    } catch (e) {
      console.warn("Failed saving to localStorage", e);
    }

    if (db) {
      try {
        const prodCol = collection(db, 'sabora_products');
        const snap = await getDocs(prodCol);
        const newIds = new Set(newProducts.map(p => p.id));
        for (const d of snap.docs) {
          if (!newIds.has(d.id)) {
            await deleteDoc(doc(db, 'sabora_products', d.id));
          }
        }
        for (const p of newProducts) {
          const docRef = doc(db, 'sabora_products', p.id);
          await setDoc(docRef, p, { merge: true });
        }
      } catch (err) {
        console.warn("Firestore saveProducts info:", err);
      }
    }
  }, []);

  // Save hero slides to state, localStorage, and Firestore
  const saveHeroSlides = useCallback(async (newSlides) => {
    setHeroSlides(newSlides);
    try {
      localStorage.setItem(LS_HERO_KEY, JSON.stringify(newSlides));
    } catch (e) {
      console.warn("Failed saving hero slides to localStorage", e);
    }

    if (db) {
      try {
        const heroCol = collection(db, 'sabora_hero_slides');
        const snap = await getDocs(heroCol);
        const newIds = new Set(newSlides.map(s => s.id));
        for (const d of snap.docs) {
          if (!newIds.has(d.id)) {
            await deleteDoc(doc(db, 'sabora_hero_slides', d.id));
          }
        }
        for (const s of newSlides) {
          const docRef = doc(db, 'sabora_hero_slides', s.id);
          await setDoc(docRef, s, { merge: true });
        }
      } catch (err) {
        console.warn("Firestore saveHeroSlides info:", err);
      }
    }
  }, []);

  // Submit an inquiry (contact / quote request)
  const submitInquiry = useCallback(async (inquiryData) => {
    const id = "inq_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6);
    const newInquiry = {
      id,
      ...inquiryData,
      status: "New",
      createdAt: new Date().toISOString()
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    try {
      localStorage.setItem(LS_INQUIRIES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed saving inquiries to localStorage", e);
    }

    if (db) {
      try {
        await addDoc(collection(db, 'sabora_inquiries'), {
          ...inquiryData,
          status: "New",
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.warn("Firestore submitInquiry warning:", err);
      }
    }

    return newInquiry;
  }, [inquiries]);

  // Update inquiry status
  const updateInquiryStatus = useCallback(async (id, newStatus) => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq);
    setInquiries(updated);
    try {
      localStorage.setItem(LS_INQUIRIES_KEY, JSON.stringify(updated));
    } catch (e) {}

    if (db) {
      try {
        const docRef = doc(db, 'sabora_inquiries', id);
        await setDoc(docRef, { status: newStatus }, { merge: true });
      } catch (err) {}
    }
  }, [inquiries]);

  // Delete an inquiry
  const deleteInquiry = useCallback(async (id) => {
    const updated = inquiries.filter(inq => inq.id !== id);
    setInquiries(updated);
    try {
      localStorage.setItem(LS_INQUIRIES_KEY, JSON.stringify(updated));
    } catch (e) {}

    if (db) {
      try {
        await deleteDoc(doc(db, 'sabora_inquiries', id));
      } catch (err) {}
    }
  }, [inquiries]);

  // Reset to original defaults
  const resetAllToDefaults = useCallback(() => {
    setProducts(DEFAULT_PRODUCTS);
    setHeroSlides(DEFAULT_HERO_SLIDES);
    try {
      localStorage.removeItem(LS_PRODUCTS_KEY);
      localStorage.removeItem(LS_HERO_KEY);
    } catch (e) {}
  }, []);

  return {
    products,
    heroSlides,
    inquiries,
    isLoadingFromFirebase,
    firebaseStatus,
    saveProducts,
    saveHeroSlides,
    submitInquiry,
    updateInquiryStatus,
    deleteInquiry,
    resetAllToDefaults
  };
}

export default useProducts;
