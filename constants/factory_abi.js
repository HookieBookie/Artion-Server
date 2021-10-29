const CollectionFactoryContract = {
  MAINNET_721_PRIVATE: '0x45d11874D958fdf7Dc25CCD1625F10dbA73E21C2', //FantomNFTFactoryPrivate
  MAINNET_721_PUBLIC: '0x881bcfbDBf780000386763057c4636e61d9EFD46', //FantomNFTFactory
  TESTNET_721_PRIVATE: '0x45d11874D958fdf7Dc25CCD1625F10dbA73E21C2', //FantomNFTFactoryPrivate
  TESTNET_721_PUBLIC: '0x881bcfbDBf780000386763057c4636e61d9EFD46', //FantomNFTFactory
  MAINNET_1155_PRIVATE: '0x99E52eeACDc489205C1FF06f89F23A00Bd631cE6', //FantomArtFactoryPrivate
  MAINNET_1155_PUBLIC: '0x1af8C95691296CC1b17Dd52f93ef71F66301FD6A', //FantomArtFactory
  TESTNET_1155_PRIVATE: '0x99E52eeACDc489205C1FF06f89F23A00Bd631cE6', //FantomArtFactoryPrivate
  TESTNET_1155_PUBLIC: '0x1af8C95691296CC1b17Dd52f93ef71F66301FD6A', //FantomArtFactory
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
