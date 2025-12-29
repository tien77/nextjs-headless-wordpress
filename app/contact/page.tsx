import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";

export const metadata = {
    title: "Contact Us | The Journal",
    description: "Get in touch with our team for any inquiries or feedback.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-background to-muted/20 pb-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
                    </svg>
                </div>
                <div className="container relative mx-auto px-4 text-center">
                    <h1 className="mb-4 text-4xl font-black tracking-tight sm:text-6xl uppercase italic">
                        Get in <span className="text-secondary">Touch</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg opacity-90 sm:text-xl">
                        Have a question, feedback, or just want to say hello? We'd love to hear from you.
                        Our team usually responds within 24 hours.
                    </p>
                </div>
            </div>

            <div className="container mx-auto -mt-12 px-4">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Contact Info Cards */}
                    <div className="space-y-4 lg:col-span-1">
                        <Card className="border-none bg-background/60 shadow-xl backdrop-blur-md transition-all hover:scale-[1.02]">
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="rounded-full bg-primary/10 p-3 text-primary">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Email Us</p>
                                    <p className="font-bold">hello@thejournal.com</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none bg-background/60 shadow-xl backdrop-blur-md transition-all hover:scale-[1.02]">
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="rounded-full bg-primary/10 p-3 text-primary">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Call Us</p>
                                    <p className="font-bold">+1 (555) 000-0000</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none bg-background/60 shadow-xl backdrop-blur-md transition-all hover:scale-[1.02]">
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="rounded-full bg-primary/10 p-3 text-primary">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Visit Us</p>
                                    <p className="font-bold">123 Media Ave, News City, NY 10001</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none bg-primary text-primary-foreground shadow-xl transition-all hover:scale-[1.02]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 italic">
                                    <Clock className="h-5 w-5" /> Working Hours
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 opacity-90">
                                <div className="flex justify-between border-b border-primary-foreground/20 pb-2">
                                    <span>Monday - Friday</span>
                                    <span className="font-bold">9AM - 6PM</span>
                                </div>
                                <div className="flex justify-between border-b border-primary-foreground/20 pb-2">
                                    <span>Saturday</span>
                                    <span className="font-bold">10AM - 4PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="font-bold">Closed</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="h-full border-none shadow-2xl overflow-hidden">
                            <div className="bg-muted/30 p-8 sm:p-12">
                                <CardHeader className="px-0 pt-0">
                                    <CardTitle className="text-3xl font-black italic uppercase">Send us a message</CardTitle>
                                    <CardDescription className="text-base">
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-0 pb-0">
                                    <form className="grid gap-6">
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest">Full Name</Label>
                                                <Input id="name" placeholder="John Doe" className="h-12 border-none bg-background shadow-sm focus-visible:ring-primary" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest">Email Address</Label>
                                                <Input id="email" type="email" placeholder="john@example.com" className="h-12 border-none bg-background shadow-sm focus-visible:ring-primary" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest">Subject</Label>
                                            <Input id="subject" placeholder="How can we help?" className="h-12 border-none bg-background shadow-sm focus-visible:ring-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-xs font-bold uppercase tracking-widest">Message</Label>
                                            <Textarea id="message" placeholder="Your message here..." className="min-h-[150px] border-none bg-background shadow-sm focus-visible:ring-primary" />
                                        </div>
                                        <Button size="lg" className="h-14 gap-2 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95">
                                            <Send className="h-5 w-5" /> Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* FAQ or Bottom Section */}
            <div className="container mx-auto mt-24 px-4 text-center">
                <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-6">
                    <Globe className="mr-2 h-4 w-4" /> Global Support
                </div>
                <h2 className="mb-12 text-3xl font-black italic uppercase sm:text-4xl">Frequently Asked Questions</h2>
                <div className="grid gap-6 text-left md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            q: "How fast do you respond?",
                            a: "We aim to respond to all inquiries within 24 business hours."
                        },
                        {
                            q: "Do you offer advertising?",
                            a: "Yes, we have various advertising packages for brands of all sizes."
                        },
                        {
                            q: "Can I contribute an article?",
                            a: "We love guest contributors! Check our 'Join Us' page for more details."
                        }
                    ].map((faq, i) => (
                        <div key={i} className="group rounded-2xl bg-background p-6 shadow-md transition-all hover:shadow-xl">
                            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black italic">
                                ?
                            </div>
                            <h3 className="mb-2 font-bold text-lg">{faq.q}</h3>
                            <p className="text-muted-foreground">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
