"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState("organize"); // organize, hired, board

  return (
    /* Hero Images Section with Tabs */
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-8">
            <Button
              variant={activeTab === "organize" ? "default" : "secondary"}
              onClick={() => setActiveTab("organize")}
              className="rounded-lg px-6 py-3 text-sm font-medium"
            >
              Organize Application
            </Button>
            <Button
              variant={activeTab === "hired" ? "default" : "secondary"}
              onClick={() => setActiveTab("hired")}
              className="rounded-lg px-6 py-3 text-sm font-medium"
            >
              Get Hired
            </Button>
            <Button
              variant={activeTab === "board" ? "default" : "secondary"}
              onClick={() => setActiveTab("board")}
              className="rounded-lg px-6 py-3 text-sm font-medium"
            >
              Job Boards
            </Button>
          </div>

          {/* Image Preview */}
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
            {activeTab === "organize" && (
              <Image
                src="/hero-images/hero0.png"
                alt="Organize Application"
                width={1200}
                height={800}
                priority
              />
            )}
            {activeTab === "hired" && (
              <Image
                src="/hero-images/hero1.png"
                alt="Get Hired"
                width={1200}
                height={800}
              />
            )}
            {activeTab === "board" && (
              <Image
                src="/hero-images/hero2.png"
                alt="Job Boards"
                width={1200}
                height={800}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}