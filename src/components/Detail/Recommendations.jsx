import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Car from '../../assets/recommendation1.png';
import ArrowLeft from '../../assets/Arrow.png';
import ArrowRight from '../../assets/ArrowRight.png';

const RecommendationsWrapper = styled.div`
  width: 73.5rem;
`;

const Title = styled.h2`
  margin-bottom: 0.625rem; 
  color: #ffffff;
`;

const RecommendationsContainer = styled.div`
  width: 73.5rem;
  height: 23rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.625rem; 
  color: #ffffff;
  position: relative;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 5.5rem;
  left: 13rem;
  padding-right: 2.06rem;
  max-width: calc(100% - 13.75rem);
  color: var(--White, #FFF);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const CarImage = styled.img`
  position: absolute;
  top: 2.75rem;
  left: 1.62rem;
  width: auto;
  height: auto;
  max-width: calc(62.94rem - 1.62rem);
  max-height: calc(21.75rem - 2.75rem - 8.25rem);
  object-fit: contain;
`;

const SmallText = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 1.62rem;
  color: #ffffff;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 400;
`;

const SmallText2 = styled.div`
  position: absolute;
  top: 13rem;
  left: 1.62rem;
  color: #ffffff;
  font-family: Pretendard;
  font-size: 1.2rem;
  font-weight: 400;
`;

const RecommendationLinkBox = styled.div`
  position: absolute;
  top: 15.81rem;
  left: 2rem;
  padding: 1.75rem 2.06rem;
  border-radius: 0.75rem;
  border: 1px solid var(--Main_2, #01ECFF);
  color: var(--White, #FFF);
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 400;
  text-align: left;
  display: block;
  width: calc(100% - 4.06rem);
`;

const RecommendationLink = styled.a`
  display: block;
  margin-bottom: 0.5rem;
  color: #01ECFF;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ArrowImageLeft = styled.img`
  position: absolute;
  top: 50%;
  left: -2rem;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ArrowImageRight = styled.img`
  position: absolute;
  top: 50%;
  right: -2rem;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Recommendations = ({ recommendations }) => {
  console.log(recommendations);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageContent, setPageContent] = useState([]);

  useEffect(() => {
    const fetchedContent = recommendations.map(rec => ({
      smallText: rec.smallText,
      description: rec.description,
      links: rec.links,
    }));
    setPageContent(fetchedContent);
  }, [recommendations]);

  const handleNextPage = () => {
    if (currentPage < pageContent.length - 1) {
      setCurrentPage(currentPage + 1); // 다음 페이지로 이동
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1); // 이전 페이지로 이동
    }
  };

  if (pageContent.length === 0) {
    return <div>로딩 중...</div>;
  }

  return (
    <RecommendationsWrapper>
      <Title>🚘 이런 교통수단을 이용하면 더욱 편리해요</Title>
      <RecommendationsContainer>
        <ArrowImageLeft
          src={ArrowLeft}
          alt="Left Arrow"
          onClick={handlePrevPage}
          style={{ visibility: currentPage === 0 ? 'hidden' : 'visible' }} // 첫 페이지에서 숨김
        />
        
        <>
          <SmallText>{pageContent[currentPage].smallText}</SmallText>
          <CarImage src={Car} alt="교통수단 이미지" />
          <SmallText2>추천 사이트</SmallText2>
          <TextContainer>
            {pageContent[currentPage].description}
          </TextContainer>
          <RecommendationLinkBox>
            {pageContent[currentPage].links.map((link, index) => (
              <RecommendationLink key={index} href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </RecommendationLink>
            ))}
          </RecommendationLinkBox>
        </>
        
        <ArrowImageRight
          src={ArrowRight}
          alt="Right Arrow"
          onClick={handleNextPage}
          style={{ visibility: currentPage === pageContent.length - 1 ? 'hidden' : 'visible' }} // 마지막 페이지에서 숨김
        />
      </RecommendationsContainer>
    </RecommendationsWrapper>
  );
};

export default Recommendations;
