import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Sprout, TrendingUp, Users, BarChart3 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";

export function Home() {
  const { t } = useLanguage();
  const features = [
    {
      icon: Sprout,
      title: "Crop Management",
      description: "Track planting, growth, and harvest schedules for all your crops.",
    },
    {
      icon: TrendingUp,
      title: "Resource Tracking",
      description: "Monitor inventory levels of seeds, fertilizers, and equipment.",
    },
    {
      icon: Users,
      title: "Labor Management",
      description: "Manage your workforce, track hours, and calculate wages.",
    },
    {
      icon: BarChart3,
      title: "Expense Analysis",
      description: "Analyze costs and optimize your farm's financial performance.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                {t("manageYourFarm")}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t("farmDescription")}
              </p>
              <div className="flex gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1756638425687-64a8f76c9368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYWdyaWN1bHR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzczMTUyNjMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Farm landscape"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("everythingYouNeed")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("powerfulTools")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Farm Management?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers who are already optimizing their operations
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}