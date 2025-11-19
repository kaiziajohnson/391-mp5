"use client";

import styled from "styled-components";
import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fdf2f8; 
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  padding: 1%;
`;

export default function HomePage() {
    return (
        <PageWrapper>
            <Header />
            <Main>
                <HomeContent />
            </Main>
        </PageWrapper>
    );
}
