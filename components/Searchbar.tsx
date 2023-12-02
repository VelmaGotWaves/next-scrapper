"use client"

import { useState, FormEvent } from 'react'
import { scrapeAndStoreProduct } from '../lib/actions';

const isValidAmazonProductURL = (url: string): boolean => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;
        if (hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.includes('amazon')) {
            return true;
        }
    } catch (err) {
        return false;
    }
    return false;
}

function Searchbar() {

    const [searchPrompt, setSearchPrompt] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValidLink = isValidAmazonProductURL(searchPrompt);
        if (!isValidLink) return alert('Please provide a valid Amazon link');

        try {
            setIsLoading(true);

            const product = scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);

        }
    }

    return (
        <form
            className="flex flex-wrap gap-4 mt-12"
            onSubmit={handleSubmit}
        >
            <input
                type='text'
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder='Enter product link'
                className='searchbar-input'
            />
            <button type='submit' className='searchbar-btn' disabled={searchPrompt === ''}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    )
}

export default Searchbar