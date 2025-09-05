declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);

  interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> {}

  interface ComponentLifecycle<P, S, SS = any> {}

  type Key = string | number;
  type ReactNode = any;
  
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useRef<T>(initialValue: T): { current: T };
  export const Component: any;
}

declare module 'framer-motion' {
  export const motion: any;
}

declare module 'lucide-react' {
  export const ArrowRight: any;
  export const ArrowLeft: any;
  export const Download: any;
  export const MessageCircle: any;
  export const Menu: any;
  export const X: any;
  export const Sun: any;
  export const Moon: any;
  export const ExternalLink: any;
  export const Calendar: any;
  export const Clock: any;
  export const Users: any;
  export const TrendingUp: any;
  export const MapPin: any;
  export const Mail: any;
  export const Phone: any;
  export const Palette: any;
  export const Code: any;
  export const Smartphone: any;
  export const Zap: any;
  export const Star: any;
  export const Quote: any;
  export const Send: any;
  export const CheckCircle: any;
  export const AlertCircle: any;
}

declare module 'next/link' {
  import { ComponentType, ReactNode } from 'react';

  interface LinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    target?: string;
    rel?: string;
    onClick?: () => void;
  }

  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module 'next/image' {
  import { ComponentType } from 'react';

  interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    className?: string;
  }

  const Image: ComponentType<ImageProps>;
  export default Image;
}
