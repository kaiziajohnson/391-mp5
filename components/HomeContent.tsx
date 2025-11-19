"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import insertUrl from "@/lib/insertUrl";

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Card = styled.div`
    width: 70vw;
    background: white;
    padding: 2%;
    border-radius: 4%;
`;

const Title = styled.h2`
    font-size: xx-large;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2%;
    color: deeppink;
`;

const Label = styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 1%;
    color: #0a0a0a;
`;

const Input = styled.input`
    width: 100%;
    padding: 2%;
    font-size: large;
    border: 1px solid hotpink;
    border-radius: 1%;
    margin-bottom: 2%;
    

`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 2%;
    margin-bottom: 3%;
`;

const DomainText = styled.span`
    color: black;
    font-size: medium;
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
    width: 100%;
    padding: 2%;
    background-color: pink;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 1%;
    cursor: pointer;
`;

const ErrorMsg = styled.p`
    color: red;
    font-weight: bold;
    margin-top: 1%;
`;

const ResultBox = styled.div`
    margin-top: 2%;
    padding: 2%;
    background: hotpink;
    border-radius: 1%;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ShortUrlLink = styled.a`
    font-family: monospace;
    color: blue;
    text-decoration: underline;
    margin-right: 1%;
`;

const CopyButton = styled.button`
    background: pink;
    color: white;
    padding: 2%;
    border: none;
    border-radius: 2%;
    cursor: pointer;
    font-size: small;
    font-weight: bold;
`;

export default function HomeContent() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [domain, setDomain] = useState("");
    const [copied, setCopied] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setShortUrl("");
        setCopied(false);

        const err = await insertUrl({ url, alias });

        if (err.length > 0) {
            setError(err);
        } else {
            setShortUrl(`${domain}/${alias}`);
        }

        setLoading(false);
    }

    function copyShortUrl() {
        if (!shortUrl) return;
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
    }

    useEffect(() => {
        setDomain(window.location.origin);
    }, []);

    return (
        <PageWrapper>
            <Card>
                <Title>Shorten a URL</Title>

                <form onSubmit={handleSubmit}>
                    <Label>URL</Label>
                    <Input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/long-link"
                    />

                    <Label>Custom Alias</Label>
                    <Row>
                        <DomainText>{domain}/</DomainText>
                        <Input
                            type="text"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            placeholder="your-alias"
                            style={{ marginBottom: 0 }}
                        />
                    </Row>

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? "Shortening..." : "Shorten"}
                    </SubmitButton>
                </form>

                {error && <ErrorMsg>{error}</ErrorMsg>}

                {shortUrl && (
                    <ResultBox>
                        <ShortUrlLink href={shortUrl} target="_blank">
                            {shortUrl}
                        </ShortUrlLink>
                        <CopyButton onClick={copyShortUrl}>
                            {copied ? "Copied!" : "Copy"}
                        </CopyButton>
                    </ResultBox>
                )}
            </Card>
        </PageWrapper>
    );
}
