"use client";

"use client";
import Link from "next/link";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: pink; /* sky-700 equivalent */
  color: white;
  padding: 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: x-large;
  font-weight: bold;
  text-decoration: none;
`;

export default function Header() {
    return (
        <HeaderWrapper>
            <Link href="/" >
                <Title>Kaizia's CS391 URL Shortener</Title>
            </Link>
        </HeaderWrapper>
    );
}
