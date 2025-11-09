import { InstaIcon } from "./icons/InstaIcon";
import { XSocialIcon } from "./icons/XSocialIcon";
import { TikTokIcon } from "./icons/TikTokIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";

export default function Footer() {
  return (
    <footer className="py-5 bg-black text-white/60 border-t border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="text-center">
            © 2024 Your Company, Inc. All Rights reserved
          </div>
          <ul className="flex justify-center gap-2.5">
            <li>
              <XSocialIcon />
            </li>
            <li>
              <InstaIcon />
            </li>
            <li>
              <TikTokIcon />
            </li>
            <li>
              <YoutubeIcon />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
