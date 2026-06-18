import { ShareButton } from './ShareButton';

export function HeaderShare() {
  return (
    <ShareButton
      label="Share"
      buttonClassName="header-share"
      align="right"
      title="Purchasing Power Roadmap"
      description="Explore purchasing power journeys across supported countries and historical years."
    />
  );
}
