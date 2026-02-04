"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

// Realistic demo data for the landing page
const testimonialMessages = [
  { title: "From Anonymous", content: "I really like your work ethic! Keep it up.", time: "2h ago" },
  { title: "From Anonymous", content: "You have a great sense of humor.", time: "5h ago" },
  { title: "From Anonymous", content: "How do you stay so productive?", time: "1d ago" },
  { title: "From Anonymous", content: "Your latest project was amazing!", time: "2d ago" },
  { title: "From Anonymous", content: "What is your secret to staying calm?", time: "3d ago" },
];

export default function LandingPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  return (
    <main className="flex-col flex min-h-screen bg-gray-50 dark:bg-grid-white/[0.02]">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Dive into the World of <br />
            <span className="text-blue-600">Anonymous Feedback</span>
          </h1>
          <p className="max-w-[700px] mx-auto text-lg md:text-xl text-muted-foreground">
            True feedback is honest. Share your unique link and let people tell you what they really think, completely anonymously.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="px-8 font-bold text-lg h-14 cursor-pointer">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Carousel Section: "What people are saying" */}
      <section className="bg-white dark:bg-black/20 py-16 border-y">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-600 uppercase tracking-widest">
            Recent Messages
          </h2>
          
          <Carousel
            plugins={[plugin.current, Autoplay({
          delay: 2000,
        })]}
            className="w-full max-w-lg mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {testimonialMessages.map((msg, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card className="border-2 shadow-lg">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-500 flex items-center gap-2">
                          <Mail className="h-4 w-4" /> {msg.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-lg font-semibold italic text-gray-800 dark:text-gray-200">
                          "{msg.content}"
                        </p>
                        <p className="text-xs text-muted-foreground text-right">
                          {msg.time}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Footer / Call to Action */}
      <footer className="mt-auto py-10 text-center text-muted-foreground text-sm">
        © 2026 Anonymous Feedback App. Built with privacy in mind.
      </footer>
    </main>
  )
}