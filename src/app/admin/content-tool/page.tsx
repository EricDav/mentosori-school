import ContentToolClient from "@/components/admin/content-tool-client";

export default function ContentToolPage() {
    return (
        <div className="container mx-auto max-w-3xl py-12 md:py-24">
            <div className="space-y-4 text-center mb-12">
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">AI Content Generation Tool</h1>
                <p className="text-muted-foreground md:text-xl">
                    Describe current school events, and our AI will suggest a news article title and outline for you.
                </p>
            </div>
            <ContentToolClient />
        </div>
    );
}
