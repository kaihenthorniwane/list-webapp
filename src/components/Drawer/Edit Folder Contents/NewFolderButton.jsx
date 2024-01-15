import { useOverlay } from "@/contexts/OverlayContext";
import Drawer from "../Drawer";
import EditFolderTitle from "./EditFolderTitle";

export default function NewFolderButton() {
  const { isOn, setIsOn, setOverlay } = useOverlay();
  return (
    <div
      className="fixed z-[90] bottom-5 right-5 brand-button-transition opacity-button-transition md:hidden"
      onClick={() => {
        setOverlay(
          <Drawer>
            <EditFolderTitle />
          </Drawer>
        );
        setIsOn(true);
      }}
    >
      <svg
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="58" height="58" rx="29" fill="rgb(var(--Brand-Black))" />
        <path
          d="M14 23.0625C14 19.7149 14 18.041 14.9393 16.9247C15.0869 16.7493 15.2493 16.5869 15.4247 16.4393C16.541 15.5 18.2149 15.5 21.5625 15.5H22.0124C23.3847 15.5 24.0708 15.5 24.6902 15.7079C25.0859 15.8407 25.4583 16.0346 25.7941 16.2826C26.3196 16.6709 26.7131 17.233 27.5 18.3571C28.0902 19.2003 28.3853 19.6218 28.7795 19.913C29.0312 20.099 29.3106 20.2445 29.6073 20.3441C30.0719 20.5 30.5865 20.5 31.6157 20.5H34C38.714 20.5 41.0711 20.5 42.5355 21.9645C44 23.4289 44 25.786 44 30.5V32.5C44 37.214 44 39.5711 42.5355 41.0355C41.0711 42.5 38.714 42.5 34 42.5H24C19.286 42.5 16.9289 42.5 15.4645 41.0355C14 39.5711 14 37.214 14 32.5V23.0625Z"
          stroke="rgb(var(--Brand-White))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M33 30.75L24.5 30.75"
          stroke="rgb(var(--Brand-White))"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28.75 26.5L28.75 35"
          stroke="rgb(var(--Brand-White))"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
