import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  const token = process.env.LOCATIONIQ_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'LocationIQ token no configurado' },
      { status: 500 }
    );
  }

  try {
    const url = `https://us1.locationiq.com/v1/search?key=${token}&q=${encodeURIComponent(
      query
    )}&format=json&limit=5&accept-language=es`;

    const response = await fetch(url);
    const data = await response.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions = data.map((item) => ({
      display_name: item.display_name,
      lat: item.lat,
      lon: item.lon,
      type: item.type,
    }));

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('[LocationIQ] Error:', error);
    return NextResponse.json(
      { error: 'Error al buscar direcciones' },
      { status: 500 }
    );
  }
}
