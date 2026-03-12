import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi" | "mr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    crops: "Crops",
    resources: "Resources",
    labor: "Labor",
    expenses: "Expenses",
    
    // Common
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    save: "Save",
    update: "Update",
    search: "Search",
    filter: "Filter",
    name: "Name",
    status: "Status",
    actions: "Actions",
    description: "Description",
    
    // Auth
    login: "Sign In",
    register: "Sign Up",
    logout: "Logout",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    farmName: "Farm Name",
    welcomeBack: "Welcome back",
    createAccount: "Create an account",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    
    // Dashboard
    welcomeMessage: "Welcome back! Here's what's happening on your farm.",
    activeCrops: "Active Crops",
    resourcesInStock: "Resources in Stock",
    activeWorkers: "Active Workers",
    monthlyExpenses: "Monthly Expenses",
    recentActivity: "Recent Activity",
    
    // Crops
    cropManagement: "Crop Management",
    trackManageCrops: "Track and manage all your crops",
    addCrop: "Add Crop",
    cropName: "Crop Name",
    variety: "Variety",
    field: "Field",
    area: "Area",
    plantingDate: "Planting Date",
    expectedHarvest: "Expected Harvest",
    totalCrops: "Total Crops",
    totalArea: "Total Area",
    readyToHarvest: "Ready to Harvest",
    
    // Resources
    resourceManagement: "Resource Management",
    trackResources: "Track and manage farm resources and inventory",
    addResource: "Add Resource",
    resourceName: "Resource Name",
    category: "Category",
    quantity: "Quantity",
    unit: "Unit",
    minThreshold: "Minimum Threshold",
    location: "Location",
    lowStockAlert: "Low Stock Alert",
    totalResources: "Total Resources",
    categories: "Categories",
    lowStockItems: "Low Stock Items",
    wellStocked: "Well Stocked",
    
    // Labor
    laborManagement: "Labor Management",
    manageWorkforce: "Manage your workforce and track labor costs",
    addWorker: "Add Worker",
    role: "Role",
    contact: "Contact",
    hoursWorked: "Hours Worked",
    wagePerHour: "Wage per Hour",
    totalWorkers: "Total Workers",
    totalHours: "Total Hours",
    totalPayroll: "Total Payroll",
    avgWage: "Avg. Wage/Hour",
    
    // Expenses
    expenseManagement: "Expense Management",
    trackAnalyzeExpenses: "Track and analyze farm expenses",
    addExpense: "Add Expense",
    date: "Date",
    amount: "Amount",
    paymentMethod: "Payment Method",
    totalExpenses: "Total Expenses",
    thisMonth: "This Month",
    totalTransactions: "Total Transactions",
    avgPerTransaction: "Avg. per Transaction",
    
    // Home
    manageYourFarm: "Manage Your Farm Resources Efficiently",
    farmDescription: "Streamline your agricultural operations with our comprehensive farm management system. Track crops, manage labor, monitor resources, and control expenses all in one place.",
    getStarted: "Get Started",
    signIn: "Sign In",
    everythingYouNeed: "Everything You Need to Run Your Farm",
    powerfulTools: "Powerful tools designed specifically for modern farmers",
    transformFarmManagement: "Ready to Transform Your Farm Management?",
    joinThousands: "Join thousands of farmers who are already optimizing their operations",
    
    // Theme
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    
    // Account
    farmerInformation: "Farmer Information",
    manageAccountDetails: "Manage your account settings and farm profile",
    personalDetails: "Personal Details",
    phone: "Phone Number",
    enterFarmAddress: "Enter farm address",
    address: "Farm Address",
    farmTotalArea: "Land Area (Acres)",
    cropType: "Crop Type",
    farmDetails: "Farm Details",
    personalDetailsUpdated: "Personal details updated successfully",
    farmDetailsUpdated: "Farm details updated successfully",
  },
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    crops: "फसलें",
    resources: "संसाधन",
    labor: "श्रम",
    expenses: "खर्चे",
    
    // Common
    add: "जोड़ें",
    edit: "संपादित करें",
    delete: "हटाएं",
    cancel: "रद्द करें",
    save: "सहेजें",
    update: "अपडेट करें",
    search: "खोजें",
    filter: "फ़िल्टर करें",
    name: "नाम",
    status: "स्थिति",
    actions: "कार्य",
    description: "विवरण",
    
    // Auth
    login: "साइन इन करें",
    register: "साइन अप करें",
    logout: "लॉग आउट",
    email: "ईमेल",
    password: "पासवर्ड",
    fullName: "पूरा नाम",
    farmName: "खेत का नाम",
    welcomeBack: "वापसी पर स्वागत है",
    createAccount: "खाता बनाएं",
    alreadyHaveAccount: "पहले से खाता है?",
    dontHaveAccount: "खाता नहीं है?",
    
    // Dashboard
    welcomeMessage: "वापसी पर स्वागत है! यहाँ आपके खेत में क्या हो रहा है।",
    activeCrops: "सक्रिय फसलें",
    resourcesInStock: "स्टॉक में संसाधन",
    activeWorkers: "सक्रिय कर्मचारी",
    monthlyExpenses: "मासिक खर्चे",
    recentActivity: "हाल की गतिविधि",
    
    // Crops
    cropManagement: "फसल प्रबंधन",
    trackManageCrops: "अपनी सभी फसलों को ट्रैक और प्रबंधित करें",
    addCrop: "फसल जोड़ें",
    cropName: "फसल का नाम",
    variety: "किस्म",
    field: "खेत",
    area: "क्षेत्र",
    plantingDate: "रोपण तिथि",
    expectedHarvest: "अपेक्षित कटाई",
    totalCrops: "कुल फसलें",
    totalArea: "कुल क्षेत्र",
    readyToHarvest: "कटाई के लिए तैयार",
    
    // Resources
    resourceManagement: "संसाधन प्रबंधन",
    trackResources: "खेत के संसाधनों और इन्वेंटरी को ट्रैक और प्रबंधित करें",
    addResource: "संसाधन जोड़ें",
    resourceName: "संसाधन का नाम",
    category: "श्रेणी",
    quantity: "मात्रा",
    unit: "इकाई",
    minThreshold: "न्यूनतम सीमा",
    location: "स्थान",
    lowStockAlert: "कम स्टॉक चेतावनी",
    totalResources: "कुल संसाधन",
    categories: "श्रेणियां",
    lowStockItems: "कम स्टॉक आइटम",
    wellStocked: "अच्छा स्टॉक",
    
    // Labor
    laborManagement: "श्रम प्रबंधन",
    manageWorkforce: "अपने कार्यबल का प्रबंधन करें और श्रम लागत ट्रैक करें",
    addWorker: "कर्मचारी जोड़ें",
    role: "भूमिका",
    contact: "संपर्क",
    hoursWorked: "काम के घंटे",
    wagePerHour: "प्रति घंटा वेतन",
    totalWorkers: "कुल कर्मचारी",
    totalHours: "कुल घंटे",
    totalPayroll: "कुल वेतन",
    avgWage: "औसत वेतन/घंटा",
    
    // Expenses
    expenseManagement: "खर्च प्रबंधन",
    trackAnalyzeExpenses: "खेत के खर्चों को ट्रैक और विश्लेषण करें",
    addExpense: "खर्च जोड़ें",
    date: "तारीख",
    amount: "राशि",
    paymentMethod: "भुगतान विधि",
    totalExpenses: "कुल खर्चे",
    thisMonth: "इस महीने",
    totalTransactions: "कुल लेनदेन",
    avgPerTransaction: "औसत प्रति लेनदेन",
    
    // Home
    manageYourFarm: "अपने खेत के संसाधनों को कुशलता से प्रबंधित करें",
    farmDescription: "हमारी व्यापक खेत प्रबंधन प्रणाली के साथ अपने कृषि संचालन को सुव्यवस्थित करें। फसलों को ट्रैक करें, श्रम प्रबंधित करें, संसाधनों की निगरानी करें, और एक ही स्थान पर खर्चों को नियंत्रित करें।",
    getStarted: "शुरू करें",
    signIn: "साइन इन करें",
    everythingYouNeed: "आपके खेत को चलाने के लिए आवश्यक सब कुछ",
    powerfulTools: "आधुनिक किसानों के लिए विशेष रूप से डिज़ाइन किए गए शक्तिशाली उपकरण",
    transformFarmManagement: "अपने खेत प्रबंधन को बदलने के लिए तैयार?",
    joinThousands: "हजारों किसानों के साथ जुड़ें जो पहले से ही अपने संचालन को अनुकूलित कर रहे हैं",
    
    // Theme
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    language: "भाषा",

    // Account
    farmerInformation: "किसान की जानकारी",
    manageAccountDetails: "अपनी खाता सेटिंग और खेत प्रोफ़ाइल प्रबंधित करें",
    personalDetails: "व्यक्तिगत विवरण",
    phone: "फ़ोन नंबर",
    enterFarmAddress: "खेत का पता दर्ज करें",
    address: "खेत का पता",
    farmTotalArea: "भूमि क्षेत्र (एकड़)",
    cropType: "फसल का प्रकार",
    farmDetails: "खेत का विवरण",
    personalDetailsUpdated: "व्यक्तिगत विवरण सफलतापूर्वक अपडेट किया गया",
    farmDetailsUpdated: "खेत का विवरण सफलतापूर्वक अपडेट किया गया",
  },
  mr: {
    // Navigation
    dashboard: "डॅशबोर्ड",
    crops: "पिके",
    resources: "संसाधने",
    labor: "कामगार",
    expenses: "खर्च",
    
    // Common
    add: "जोडा",
    edit: "संपादित करा",
    delete: "हटवा",
    cancel: "रद्द करा",
    save: "जतन करा",
    update: "अद्यतन करा",
    search: "शोधा",
    filter: "फिल्टर करा",
    name: "नाव",
    status: "स्थिती",
    actions: "कृती",
    description: "वर्णन",
    
    // Auth
    login: "साइन इन करा",
    register: "साइन अप करा",
    logout: "लॉग आउट",
    email: "ईमेल",
    password: "पासवर्ड",
    fullName: "पूर्ण नाव",
    farmName: "शेताचे नाव",
    welcomeBack: "परत स्वागत आहे",
    createAccount: "खाते तयार करा",
    alreadyHaveAccount: "आधीच खाते आहे?",
    dontHaveAccount: "खाते नाही?",
    
    // Dashboard
    welcomeMessage: "परत स्वागत आहे! तुमच्या शेतात काय चालले आहे ते येथे आहे.",
    activeCrops: "सक्रिय पिके",
    resourcesInStock: "साठ्यातील संसाधने",
    activeWorkers: "सक्रिय कामगार",
    monthlyExpenses: "मासिक खर्च",
    recentActivity: "अलीकडील क्रियाकलाप",
    
    // Crops
    cropManagement: "पीक व्यवस्थापन",
    trackManageCrops: "तुमच्या सर्व पिकांचा मागोवा घ्या आणि व्यवस्थापित करा",
    addCrop: "पीक जोडा",
    cropName: "पिकाचे नाव",
    variety: "जात",
    field: "शेत",
    area: "क्षेत्र",
    plantingDate: "लागवडीची तारीख",
    expectedHarvest: "अपेक्षित कापणी",
    totalCrops: "एकूण पिके",
    totalArea: "एकूण क्षेत्र",
    readyToHarvest: "कापणीसाठी तयार",
    
    // Resources
    resourceManagement: "संसाधन व्यवस्थापन",
    trackResources: "शेताची संसाधने आणि यादी ट्रॅक आणि व्यवस्थापित करा",
    addResource: "संसाधन जोडा",
    resourceName: "संसाधनाचे नाव",
    category: "श्रेणी",
    quantity: "प्रमाण",
    unit: "युनिट",
    minThreshold: "किमान मर्यादा",
    location: "स्थान",
    lowStockAlert: "कमी साठा सूचना",
    totalResources: "एकूण संसाधने",
    categories: "श्रेणी",
    lowStockItems: "कमी साठा वस्तू",
    wellStocked: "चांगला साठा",
    
    // Labor
    laborManagement: "कामगार व्यवस्थापन",
    manageWorkforce: "तुमच्या कामगारांचे व्यवस्थापन करा आणि कामगार खर्चाचा मागोवा घ्या",
    addWorker: "कामगार जोडा",
    role: "भूमिका",
    contact: "संपर्क",
    hoursWorked: "काम केलेले तास",
    wagePerHour: "प्रति तास वेतन",
    totalWorkers: "एकूण कामगार",
    totalHours: "एकूण तास",
    totalPayroll: "एकूण वेतन",
    avgWage: "सरासरी वेतन/तास",
    
    // Expenses
    expenseManagement: "खर्च व्यवस्थापन",
    trackAnalyzeExpenses: "शेताच्या खर्चाचा मागोवा घ्या आणि विश्लेषण करा",
    addExpense: "खर्च जोडा",
    date: "तारीख",
    amount: "रक्कम",
    paymentMethod: "देयक पद्धत",
    totalExpenses: "एकूण खर्च",
    thisMonth: "हा महिना",
    totalTransactions: "एकूण व्यवहार",
    avgPerTransaction: "सरासरी प्रति व्यवहार",
    
    // Home
    manageYourFarm: "तुमच्या शेताची संसाधने कार्यक्षमतेने व्यवस्थापित करा",
    farmDescription: "आमच्या व्यापक शेत व्यवस्थापन प्रणालीसह तुमचे कृषी ऑपरेशन सुव्यवस्थित करा. पिकांचा मागोवा घ्या, कामगारांचे व्यवस्थापन करा, संसाधनांवर लक्ष ठेवा आणि सर्व खर्च एकाच ठिकाणी नियंत्रित करा.",
    getStarted: "सुरू करा",
    signIn: "साइन इन करा",
    everythingYouNeed: "तुमचे शेत चालवण्यासाठी आवश्यक असलेले सर्वकाही",
    powerfulTools: "आधुनिक शेतकऱ्यांसाठी खास डिझाइन केलेली शक्तिशाली साधने",
    transformFarmManagement: "तुमच्या शेत व्यवस्थापनाचे रूपांतर करण्यास तयार?",
    joinThousands: "हजारो शेतकऱ्यांसोबत सामील व्हा जे आधीच त्यांचे ऑपरेशन्स ऑप्टिमाइझ करत आहेत",
    
    // Theme
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    language: "भाषा",

    // Account
    farmerInformation: "शेतकऱ्याची माहिती",
    manageAccountDetails: "तुमची खाते सेटिंग्ज आणि शेत प्रोफाइल व्यवस्थापित करा",
    personalDetails: "वैयक्तिक तपशील",
    phone: "फोन क्रमांक",
    enterFarmAddress: "शेताचा पत्ता प्रविष्ट करा",
    address: "शेताचा पत्ता",
    farmTotalArea: "जमीन क्षेत्र (एकर)",
    cropType: "पिकाचा प्रकार",
    farmDetails: "शेताचा तपशील",
    personalDetailsUpdated: "वैयक्तिक तपशील यशस्वीरित्या अद्यतनित केले",
    farmDetailsUpdated: "शेताचा तपशील यशस्वीरित्या अद्यतनित केले",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
