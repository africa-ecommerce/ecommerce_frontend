'use client';

import { useState } from 'react';
import { generateOpenGraphImageUrl, generateContentVersion } from '@/lib/openGraph';

interface ShareButtonProps {
  product: {
    // id: string;
    name: string;
    price: number;
    currency?: string;
    imageUrl: string;
    description?: string;
    location?: string;
    features?: string[];
    rating?: number;
    duration?: string;
  };
}

export default function ShareButton({ product }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  // Platform-specific share URLs
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/products/${product.name}`
    : `/products/${product.name}`;
  
  const contentVersion = generateContentVersion(product);

  // Handle share for different platforms
  const handleShare = async (platform: 'twitter' | 'facebook' | 'whatsapp' | 'copy') => {
    setIsSharing(true);
    
    try {
      // Generate platform-specific URL if needed
      const ogImageUrl = generateOpenGraphImageUrl({
        product,
        version: contentVersion,
        platform: platform === 'copy' ? 'default' : platform,
      });
      
      let shareLink = '';
      
      switch (platform) {
        case 'twitter':
          shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this ${product.name}!`)}`;
          window.open(shareLink, '_blank', 'width=550,height=420');
          break;
          
        case 'facebook':
          shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          window.open(shareLink, '_blank', 'width=550,height=420');
          break;
          
        case 'whatsapp':
          shareLink = `https://wa.me/?text=${encodeURIComponent(
            `Check out this ${product.name}! ${ogImageUrl}`
          )}`;
          window.open(shareLink, '_blank');
          break;


          
          
        case 'copy':
          // Copy to clipboard
          await navigator.clipboard.writeText(shareUrl);
          setCopySuccess('Link copied!');
          setTimeout(() => setCopySuccess(''), 2000);
          break;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };
  
  return (
    <div className="share-container">
      <h3>Share this listing</h3>
      
      <div className="share-buttons">
        <button
          onClick={() => handleShare('twitter')}
          disabled={isSharing}
          className="share-button twitter"
          aria-label="Share on Twitter"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Twitter
        </button>
        
        <button
          onClick={() => handleShare('facebook')}
          disabled={isSharing}
          className="share-button facebook"
          aria-label="Share on Facebook"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>
        
        <button
          onClick={() => handleShare('whatsapp')}
          disabled={isSharing}
          className="share-button whatsapp"
          aria-label="Share on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm.03 18c-1.11 0-2.16-.25-3.1-.7l-3.42 1.1 1.12-3.32c-.5-.97-.77-2.07-.77-3.22 0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z" />
          </svg>
          WhatsApp
        </button>
        
        <button
          onClick={() => handleShare('copy')}
          disabled={isSharing}
          className="share-button copy"
          aria-label="Copy link"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
          </svg>
          {copySuccess || 'Copy Link'}
        </button>
      </div>
      
      <style jsx>{`
        .share-container {
          margin-top: 2rem;
          padding: 1rem;
          border-top: 1px solid #eaeaea;
        }
        
        .share-buttons {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.75rem;
          flex-wrap: wrap;
        }
        
        .share-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .twitter {
          background-color: #1DA1F2;
          color: white;
        }
        
        .facebook {
          background-color: #1877F2;
          color: white;
        }
        
        .whatsapp {
          background-color: #25D366;
          color: white;
        }
        
        .copy {
          background-color: #e0e0e0;
          color: #333;
        }
        
        .share-button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        
        .share-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}