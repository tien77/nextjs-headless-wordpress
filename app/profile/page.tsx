import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Shield, Calendar, MapPin, Link as LinkIcon } from "lucide-react";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const { user } = session;

    return (
        <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-12">
                {/* Left Column: Profile Card */}
                <aside className="lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-2xl shadow-zinc-200/50 dark:shadow-none dark:bg-zinc-900/50 overflow-hidden relative group">
                        <div className="h-32 bg-primary/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                        </div>
                        <CardContent className="relative pt-0 flex flex-col items-center text-center -mt-16 pb-10">
                            <div className="relative mb-6">
                                <Avatar className="h-32 w-32 border-4 border-background shadow-xl ring-1 ring-zinc-200 dark:ring-zinc-800">
                                    <AvatarImage src={user.image || ""} alt={user.name || ""} />
                                    <AvatarFallback className="text-4xl font-black bg-zinc-100 text-zinc-400">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 border-4 border-background rounded-full" title="Online" />
                            </div>

                            <div className="space-y-1 px-4">
                                <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white uppercase italic">
                                    {user.name}
                                </h1>
                                <p className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-1">
                                    <Mail className="h-3 w-3" /> {user.email}
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap justify-center gap-2 px-4">
                                <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-widest border-none">
                                    Member
                                </Badge>
                                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-primary/20 text-primary">
                                    Contributor
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl shadow-zinc-100/50 dark:shadow-none dark:bg-zinc-900/30">
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Quick Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-2xl font-black italic">12</p>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Stories Published</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-2xl font-black italic">1.2k</p>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Total Reads</p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-zinc-100 dark:bg-zinc-800" />

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span>Joined December 2025</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span>Ho Chi Minh City, VN</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                    <LinkIcon className="h-4 w-4 text-primary" />
                                    <a href="#" className="hover:text-primary transition-colors">portfolio.me</a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </aside>

                {/* Right Column: Content */}
                <main className="lg:col-span-8 space-y-8">
                    <div className="flex items-end justify-between">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Account Details</h2>
                            <p className="text-muted-foreground text-sm font-medium">Manage your personal information and preferences.</p>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <Card className="border-none shadow-xl shadow-zinc-100/50 dark:shadow-none dark:bg-zinc-900/30 overflow-hidden">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-black flex items-center gap-2 italic">
                                    <User className="h-5 w-5 text-primary" /> Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-8">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Full Name</label>
                                        <p className="font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-2">{user.name}</p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Email Address</label>
                                        <p className="font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-2">{user.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Bio</label>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                                        Tech enthusiast and creative storyteller based in Ho Chi Minh City. Passionate about minimalism, clean code, and building high-performance web applications using Headless WordPress and Next.js.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl shadow-zinc-100/50 dark:shadow-none dark:bg-zinc-900/30">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-black flex items-center gap-2 italic">
                                    <Shield className="h-5 w-5 text-primary" /> Security
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-bold text-zinc-900 dark:text-white">Password</p>
                                        <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                                    </div>
                                    <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">
                                        Update
                                    </button>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-bold text-zinc-900 dark:text-white">Two-Factor Authentication</p>
                                        <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                                    </div>
                                    <Badge variant="secondary" className="text-[8px] px-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-400">Disabled</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
