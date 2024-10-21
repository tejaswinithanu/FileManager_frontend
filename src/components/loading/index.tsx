import './index.css'
declare global {
    namespace JSX {
      interface IntrinsicElements {
        'dotlottie-player': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          src?: string;
          background?: string;
          speed?: number | string;
          style?: React.CSSProperties;
          loop?: boolean;
          autoplay?: boolean;
        };
      }
    }
  }

export const Loading=()=>{
   
    return(
        <div className="loader-container">
            <dotlottie-player src="https://lottie.host/120c7961-883c-4e1a-b49a-44936cea1ff0/5Gw9memTNn.json" background="transparent" speed="1" style={{ width: '500px', height: '500px' ,margin:'0px'}} loop autoplay></dotlottie-player>
            {/* <h1>Hold on for a while.</h1> */}
        </div>
    )
}