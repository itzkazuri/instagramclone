"use client";

import { useState, useRef, useEffect } from "react";

interface ReportMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onReport: () => void;
}

export function ReportMenu({ isOpen, onClose, onReport }: ReportMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={menuRef}
        className="bg-white rounded-lg p-4 w-64 dark:bg-gray-800"
      >
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Report Options
        </h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={onReport}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              Report this reel
            </button>
          </li>
          <li>
            <button
              onClick={onClose}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              Cancel
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}