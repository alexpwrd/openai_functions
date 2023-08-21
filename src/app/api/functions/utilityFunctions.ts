// utilityFunctions.ts

export async function searchStore(query: string): Promise<Array<{ name: string; price: number }>> {
    // Mock implementation for product search
    return [
      { name: `${query} Product 1`, price: 19.99 },
      { name: `${query} Product 2`, price: 29.99 },
    ];
}

