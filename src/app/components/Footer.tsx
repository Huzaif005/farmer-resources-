export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <p>© 2026 Farm Resource Management System. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}