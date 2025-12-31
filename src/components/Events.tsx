"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

const events = [
    {
        name: "ATIF ASLAM Live in Bangladesh",
        role: "Artist Management Support",
        year: "2024",
        location: "Dhaka",
        image: "/assets/atif.jpg",
    },
    {
        name: "KING Live in Bangladesh",
        role: "Logistics",
        year: "2023",
        location: "Dhaka",
        image: "/assets/king.jpg",
    },
    {
        name: "UNPLUGGED 24",
        role: "Organizer",
        year: "2024",
        location: "NSU",
        images: [
            "/assets/unplugged 1.jpg",
            "/assets/unplugged 2.jpg",
            "/assets/unplugged 3.jpg",
            "/assets/unplugged 4.jpg",
        ],
    },
    {
        name: "ACE Events",
        role: "Event Coordination",
        year: "2023-2024",
        location: "NSU",
        images: [
            "/assets/ace 1.jpg",
            "/assets/ace 2.jpg",
            "/assets/ace 3.jpg",
            "/assets/ace 4.jpg",
            "/assets/ace 5.jpg",
            "/assets/ace 6.jpg",
        ],
    },
    {
        name: "English Olympiad",
        role: "Event Management & Coordination",
        year: "2023",
        location: "Chittagong",
        image: "/assets/english olympiad.jpg",
        description: "International English Language Olympiad (IELO) - A global platform inspiring leadership through English language excellence. Participated and managed event coordination for one of the world's largest English language competitions in Chittagong, reaching 190+ million people across 100+ countries.",
    },
    {
        name: "World Orphans Day (WOC)",
        role: "Event Coordination & Social Impact",
        year: "2023",
        location: "Chittagong",
        image: "/assets/woc.png",
        description: "World Orphans Center (WOC) - Participated and coordinated events and initiatives supporting orphaned children globally in Chittagong. Organized awareness campaigns and fundraising activities as part of the World Orphans Day movement.",
    },
];

export function Events() {
    return (
        <section className="py-20 bg-secondary/10">
            <div className="container px-4 mx-auto max-w-4xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Event <span className="text-gradient">Highlights</span>
                    </h2>
                    <p className="text-foreground/70">
                        From logistics to execution, bringing mega-events to life for audiences of 25,000+.
                    </p>
                </div>

                <div className="space-y-6">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="rounded-xl bg-background border border-foreground/10 dark:border-white/5 hover:border-primary/30 transition-all overflow-hidden group"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Image Section */}
                                {(event.image || (event.images && event.images.length > 0)) && (
                                    <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                                        <Image
                                            src={event.image || event.images?.[0] || ""}
                                            alt={event.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}

                                {/* Content Section */}
                                <div className="flex-1 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                                            {event.name}
                                        </h3>
                                        <p className="text-foreground/70 mb-2">{event.role}</p>
                                        {event.description && (
                                            <p className="text-sm text-foreground/60 mb-3 line-clamp-2">
                                                {event.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-6 text-foreground/60 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {event.year}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Multiple Images Indicator */}
                                    {event.images && event.images.length > 1 && (
                                        <div className="text-xs text-foreground/60">
                                            {event.images.length} photos
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
