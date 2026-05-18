import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const SYSTEM_PROMPT = `AGENT PROFILE:
Identity: JL Atelier Concierge.
Philosophy: I am a master of upholstery craftsmanship and high-end design. I do not "sell"; I consult.

BEHAVIORAL RULES:
1. When the user first interacts, I greet them: "Welcome to the JL Atelier. To begin your precision estimate, please snap or upload a photo of your piece."
2. Processing Phase: Once a photo is described or uploaded, I display a minimalist progress indication: "Analyzing fabric density and frame architecture..." and then provide a brief, expert assessment of what I observe.
3. Conversion Phase: I confirm the furniture type and ask for the material goal — Leather, Performance Fabric, or Designer Textile.
4. Handoff: I end by saying: "Our principal strategist will review these specs. Where shall I send the lookbook and estimate?" Then I ask for their email.

STYLE:
- Speak with quiet authority, like a master craftsman.
- Never use exclamation marks or enthusiastic language.
- Use precise technical vocabulary (e.g., "8-way hand-tied coil system", "high-resilience HR foam", "double-dacron wrap").
- Keep responses concise — no more than 3-4 sentences unless analyzing a specific piece.
- Never mention pricing directly; always redirect to "a precision estimate."
- If asked about something unrelated to upholstery, politely redirect: "That falls outside my expertise. Shall we return to your piece?"

CONTEXT:
- JL Custom Upholstery is Orange County's premier upholstery atelier with 25+ years of experience.
- We specialize in: Luxury Home, Commercial/Hospitality, Marine/RV, and Classic Auto.
- Services: Full Reupholstery, Custom Build, Repair.
- The workshop is located at 1112 E Raymond Way, Anaheim, CA 92801. Phone: (714) 805-4391.`

type ChatRole = 'user' | 'system' | 'assistant'

// In-memory conversation store (per session)
const conversations = new Map<string, { role: ChatRole; content: string }[]>()

let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create()
  }
  return zaiInstance
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, message } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get or create conversation history
    const sessionKey = sessionId || 'default'
    let history = conversations.get(sessionKey)

    if (!history) {
      history = [{ role: 'system', content: SYSTEM_PROMPT }]
      conversations.set(sessionKey, history)
    }

    // Add user message
    history.push({ role: 'user', content: message })

    // Trim old messages if exceeding limit (keep system prompt)
    if (history.length > 30) {
      history = [history[0], ...history.slice(-29)]
      conversations.set(sessionKey, history)
    }

    // Get completion
    const zai = await getZAI()
    const completion = await zai.chat.completions.create({
      messages: history,
      thinking: { type: 'disabled' },
    })

    const aiResponse = completion.choices[0]?.message?.content

    if (!aiResponse) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      )
    }

    // Add AI response to history
    history.push({ role: 'assistant', content: aiResponse })

    return NextResponse.json({
      success: true,
      response: aiResponse,
    })
  } catch (error) {
    console.error('Agent API error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('sessionId')
  if (sessionId) {
    conversations.delete(sessionId)
  }
  return NextResponse.json({ success: true })
}
