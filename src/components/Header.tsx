import { Link } from '@tanstack/react-router'

import { LogOut, Menu, Tent, TentTree, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="p-4 flex items-center bg-gray-100 text-black shadow-lg z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/">
            <div className="flex items-center">
              <img src="/logo.jpeg" alt="TanStack Logo" className="h-10 mr-2" />
              KKM Organizer
            </div>
          </Link>
        </h1>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-100 text-black shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-400 border-dashed">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-300 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/app"
            activeOptions={{ exact: true }}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-200 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Tent size={20} />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/app/events"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-200 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <TentTree size={20} />
            <span className="font-medium">Events</span>
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-300 transition-colors mb-2"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
