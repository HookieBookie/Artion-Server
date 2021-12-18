const CollectionFactoryContract = {
  MAINNET_721_PRIVATE: '0xb7723715cA205ECA949E0e946e6244fF88c2C950', //FantomNFTFactoryPrivate
  MAINNET_721_PUBLIC: '0x7ffAa7C0B6A482068993597b9043659A658E5De7', //FantomNFTFactory
  TESTNET_721_PRIVATE: '0xbA6b0CF52B02f4B0C34D3ACa0dD9f6662521e074', //FantomNFTFactoryPrivate
  TESTNET_721_PUBLIC: '0xE8448E00D3E285Fe0EC70D2825AF55A5Fc8039f7', //FantomNFTFactory
  MAINNET_1155_PRIVATE: '0xFb0e36e17f65b82Dc4316B2Da4144C55c59b8026', //FantomArtFactoryPrivate
  MAINNET_1155_PUBLIC: '0x71C28F628266e2573952BC6592cbD563FDABeDFd', //FantomArtFactory
  TESTNET_1155_PRIVATE: '0xCB41a7cbB8C090F12Cc2471ebF4D206Aec2a05bF', //FantomArtFactoryPrivate
  TESTNET_1155_PUBLIC: '0x7D4A35F4ab8FF5364A20C05Fbb01C5fAB54c5a35', //FantomArtFactory
  ABI: [
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'exists',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    }
  ]
};

module.exports = CollectionFactoryContract;
