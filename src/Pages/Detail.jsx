import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoBox from '../components/Detail/InfoBox';
import MapSection from '../components/Detail/MapSection';
import Recommendations from '../components/Detail/Recommendations';
import Accommodation from '../components/Detail/Accommodation';
import Food from '../components/Detail/Food';
import Attractions from '../components/Detail/Attractions';
import Footer from '../components/Detail/Footer';
import { useSelector } from 'react-redux';

const HeaderTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;

const HeaderText = styled.div`
  position: relative;
  z-index: 1;
  padding: 1rem;
  gap: 1rem;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  width: 73.75rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GradientText = styled.span`
  background: var(--gradation_1, linear-gradient(105deg, #00E3F1 10.28%, #A3FFD4 93.01%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SvgGraphic = styled.svg`
  width: 15rem;
  height: 10.24094rem;
  flex-shrink: 0;
  stroke-width: 2px;
  stroke: rgba(0, 227, 241, 0.4);
  position: absolute;
  left: 0rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.25rem;
`;

const ContentDiv = styled.div`
  display: flex;
  width: 73.75rem;
  padding-top: 15.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 4rem;
`;








const MainPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [foods, setFoods] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [mapImage, setMapImage] = useState('');
  const { region, district, features } = useSelector((state) => state.selectedItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryString = `?region=${encodeURIComponent(region)}&district=${encodeURIComponent(district)}&features=${encodeURIComponent(features)}`;
        const response = await fetch(`/api/detail${queryString}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data from the API');
        }

        const data = await response.json();
        console.log('API Response Data:', data);

        // tourData의 첫 번째 항목을 이용해 mapImage를 설정
        const tourData = data?.tourData?.item || [];
        const firstTourItem = tourData[0]; // 첫 번째 투어 데이터를 가져옴

        setMapImage(firstTourItem?.firstimage || 'default_image_path');

        // gptComment에서 recommendations, accommodations, foods를 설정
        if (data.gptComment) {
          

          // 상태에 들어갈 데이터가 문자열인지 확인
          const trafficRecommendation = Array.isArray(data.gptComment.traffic) 
            ? data.gptComment.traffic 
            : [{ description: data.gptComment.traffic }];
          
          const hotelAccommodation = Array.isArray(data.gptComment.hotel) 
            ? data.gptComment.hotel 
            : [{ description: data.gptComment.hotel }];
          
          const foodList = Array.isArray(data.gptComment.food) 
            ? data.gptComment.food 
            : [{ description: data.gptComment.food }];
          
          setRecommendations(trafficRecommendation);       
          setAccommodations(hotelAccommodation);          
          setFoods(foodList);
         
        } else {
          console.warn('gptComment data is missing or empty');
        }

        // attractions에 tourData를 설정
        setAttractions(tourData);
      } catch (error) {
        console.error('API Error:', error.message);
      }
    };
  
    fetchData();
  }, [region, district, features]);

  
  return (
    <>
      <PageContainer>
        <ContentDiv>
          <HeaderTextContainer>
            <HeaderText>
              요청해주신 <GradientText>{district}</GradientText>의 여행 정보를 알아왔어요!
            </HeaderText>
          </HeaderTextContainer>

          <InfoBox destination={district} />
          <MapSection destination={district} mapImage={mapImage} />
          <Recommendations recommendations={recommendations} />
          <Accommodation accommodations={accommodations} />
          <Food foods={foods} />
          <Attractions attractions={attractions} />
          <Footer />
        </ContentDiv>
      </PageContainer>
    </>
  );
};

export default MainPage;
