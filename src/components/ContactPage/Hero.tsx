import styled from "styled-components";
import { contactData } from "@data/contactData";
import { LinkedInLogoIcon, FileTextIcon } from "@radix-ui/react-icons";

function Hero() {
  return (
    <HeroWrapper>
      <AvatarWrapper>
        <AvatarLarge src={contactData.avatar} alt={contactData.name} />
      </AvatarWrapper>
      <HeroText>
        <Name>{contactData.name}</Name>
        <TagLine>{contactData.date}</TagLine>
      </HeroText>
      <SocialLinks>
        <SocialLink
          href="https://www.linkedin.com/in/vikrant-gurav"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInLogoIcon width={18} height={18} />
        </SocialLink>
        <SocialLink
          href="https://apple.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </SocialLink>
        <SocialLink
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileTextIcon width={18} height={18} />
        </SocialLink>
      </SocialLinks>
    </HeroWrapper>
  );
}

export default Hero;

const HeroWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`;

const AvatarWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.06);
  background-color: #191919;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarLarge = styled.img`
  width: 115%;
  object-fit: cover;
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Name = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
`;

const TagLine = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.3);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;

  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.25s ease;

  &:hover {
    color: #ffffff;
  }
`;
