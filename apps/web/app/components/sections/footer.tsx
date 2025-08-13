export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
              <span className="text-white font-semibold text-xs">N</span>
            </div>
            <span className="text-gray-600">
              © 2024 Newsletter. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-600">
            <span className="hover:text-gray-900 transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-gray-900 transition-colors cursor-pointer">
              Terms
            </span>
            <span className="hover:text-gray-900 transition-colors cursor-pointer">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
