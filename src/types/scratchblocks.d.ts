declare module 'scratchblocks/browser.es.js' {
  interface RenderOptions {
    style?: 'scratch2' | 'scratch3' | 'scratch3-high-contrast';
    languages?: string[];
    scale?: number;
    inline?: boolean;
  }

  const scratchblocks: {
    renderMatching(selector: string, options?: RenderOptions): void;
    loadLanguages(languages: Record<string, unknown>): void;
  };

  export default scratchblocks;
}
