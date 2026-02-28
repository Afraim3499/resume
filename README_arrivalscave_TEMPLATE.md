# Arrivals Cave: The Attribution & CRO Engine

> A deeply engineered Next.js 16 storefront designed specifically to bridge the gap between aggressive Conversion Rate Optimization (CRO) and flawless, server-side ad attribution.

## 📖 The Architectural Context

During critical seasonal e-commerce launches (e.g., Eid collections in Bangladesh), traffic is expensive and incredibly fleeting. Traditional Shopify or basic React builds fail on two fronts: 
1. **Attribution Loss:** Client-side tracking pixels are decimated by iOS 14+ ad-blockers, skewing Customer Acquisition Cost (CAC) algorithms drastically.
2. **Performance Degradation:** Feature-heavy storefronts (dynamic carts, persistent countdowns, complex product matrices) typically cripple Core Web Vitals, actively hurting conversion rates.

**Arrivals Cave** was built from the ground up to synthesize high-velocity UI architecture with an unbreakable data pipeline.

---

## 🏗️ System Architecture 

The application utilizes a Server-Driven execution model to protect attribution data and guarantee client-side performance.

```mermaid
graph TD
    Client[Browser UI / Next.js Client Boundaries] 
    Server[Next.js 16 Server Actions / SSR]
    DB[(Supabase / PostgreSQL)]
    Meta[Meta Graph API / CAPI]
    Google[Google Merchant Center API]

    Client -->|1. Triggers Action| Server
    Client -.->|2. Optional Fallback Pixel| Meta
    
    Server -->|3. Validates & Commits| DB
    Server -->|4. Cryptographic Hash (SHA-256)| Server
    Server -->|5. S2S POST Request| Meta
    Server -->|6. Dynamic Variant Generation| Google
    
    style Server fill:#10b981,stroke:#333,stroke-width:2px;
    style Meta fill:#0668E1,stroke:#333,color:#fff;
    style Google fill:#F4B400,stroke:#333,color:#000;
```

---

## 🚀 Core Engineering Implementations

### 1. 100% Signal Match via Meta CAPI
Instead of relying on the fragile browser `window.fbq`, the true conversion data is fired natively from the Next.js server instance exactly when the database transaction guarantees the order.
*   **Cryptographic Normalization:** User data points (email, phone, IP) are hashed via `crypto` SHA-256 on the server before transmission to comply strictly with Meta's privacy mandates.
*   **Event Deduplication:** Client and server payloads share a synchronous `event_id`. Meta's deduplication engine receives both but favors the robust server payload, bypassing ad-blockers completely.

### 2. Algorithmic Google Merchant Feed Optimization
Standard e-commerce feeds submit a single URL per product. For apparel, this destroys the ad CTR when a user clicks an ad for an `XL` shirt but lands on an `M` default option.
*   **The Logic:** Built a generation script that algorithmically splits parent products into discrete, variant-specific SKUs using `item_group_id`. 
*   **The Result:** Ad networks can map distinct size inventory perfectly to user search queries.

### 3. Sub-Second CRO Engine
Designed a highly stateful user experience without polluting the main thread:
*   **Predictive Cart:** The smart cart drawer uses optimistic UI updates to instantly calculate caching logic and delivery fee boundaries before the server responds.
*   **Urgency Visualizations:** "Low Stock" and threshold badges are rendered dynamically while preserving the 95+ Mobile Lighthouse score.

## 🛠️ Technical Stack

*   **Core:** Next.js 16 (App Router), React 19, TypeScript
*   **Styling & Motion:** Tailwind CSS v4, Framer Motion
*   **Persistence Layer:** Supabase (PostgreSQL), Prisma ORM
*   **Validation:** Zod schemas, React Hook Form
*   **Delivery:** Vercel Edge Functions

---

## 🚦 Local Installation

1.  **Clone & Install**
    ```bash
    git clone https://github.com/Afraim3499/arrivalscave.git
    cd arrivalscave
    npm install
    ```

2.  **Environment Configuration**
    Create a `.env.local` file. Crucial keys include:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_db_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_db_key
    META_ACCESS_TOKEN=your_capi_token
    NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id
    ```

3.  **Run Development Environment**
    ```bash
    npm run dev
    ```

## 👤 Lead Architect
**Rizwanul Islam (Afraim)**  
*Your Vision Is Chaos. I Architect It Into Profit.*  
[View Portfolio](https://www.rizwanulafraim.com/)
