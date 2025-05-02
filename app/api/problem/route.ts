import { createClient } from "@/lib/supabase/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const supabase = createClient()

        const body = await req.json()

        const { error } = await supabase
            .from("problems")
            .insert({
                type: body.type,
                subtype: body.subtype,
                comment: body.comment,
                status: "search",
                user_id: body.user_id,
                location: body.location
            })
        if (error) return NextResponse.json({ error: error.message, status: 400 })

        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ error: "Failed inserting problem", details: e instanceof Error ? e.message : String(e) }, { status: 500 })
    }
}