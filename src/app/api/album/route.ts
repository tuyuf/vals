import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { entries } = await request.json();

        if (!entries || !Array.isArray(entries) || entries.length === 0) {
            return NextResponse.json({ error: "No entries provided" }, { status: 400 });
        }

        const albumId = `album_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

        const created = await prisma.albumEntry.createMany({
            data: entries.map((entry: { section: string; placeName: string; photoUrl: string; description: string }) => ({
                albumId,
                section: entry.section,
                placeName: entry.placeName,
                photoUrl: entry.photoUrl,
                description: entry.description,
            })),
        });

        return NextResponse.json({
            success: true,
            albumId,
            entriesCreated: created.count,
        });
    } catch (error) {
        console.error("Failed to save album:", error);
        return NextResponse.json({ error: "Failed to save album" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const albums = await prisma.albumEntry.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ albums });
    } catch (error) {
        console.error("Failed to fetch albums:", error);
        return NextResponse.json({ error: "Failed to fetch albums" }, { status: 500 });
    }
}
