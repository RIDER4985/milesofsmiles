import { useState } from 'react';
import Hero from './Hero';
import Destinations from './Destinations';
import DestinationModal from './DestinationModal';
import Features from './Features';
import Contact from './Contact';

interface HomePageProps {
    onSearch: (term: string) => void;
    searchFilter: string;
}

export default function HomePage({ onSearch, searchFilter }: HomePageProps) {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectDestination = (destination: any) => {
        setSelectedDestination(destination);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedDestination(null), 300);
    };

    return (
        <>
            <Hero onSearch={onSearch} searchFilter={searchFilter} />
            <Destinations
                onSelectDestination={handleSelectDestination}
                searchFilter={searchFilter}
                onClearSearch={() => onSearch('')}
            />
            <DestinationModal
                destination={selectedDestination}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
            <Features />
            <Contact />
        </>
    );
}
