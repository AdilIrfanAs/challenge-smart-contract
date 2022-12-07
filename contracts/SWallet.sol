// SPDX-License-Identifier: MIT
pragma solidity ^0.4.23;

contract DSAuthority {
  function canCall(address src, address dst, bytes4 sig) public view returns (bool);
}

contract DSAuthEvents {
  event LogSetAuthority(address indexed authority);
  event LogSetOwner(address indexed owner);
}

contract DSAuth is DSAuthEvents {
  DSAuthority public authority;
  address public owner;

  constructor() public {
    owner = msg.sender;
    emit LogSetOwner(msg.sender);
  }

  function setOwner(address owner_) public auth {
    owner = owner_;
    emit LogSetOwner(owner);
  }

  function setAuthority(DSAuthority authority_) public auth {
    authority = authority_;
    emit LogSetAuthority(authority);
  }

  modifier auth() {
    require(isAuthorized(msg.sender, msg.sig));
    _;
  }

  function isAuthorized(address src, bytes4 sig) internal view returns (bool) {
    if (src == address(this)) {
      return true;
    } else if (src == owner) {
      return true;
    } else if (authority == DSAuthority(0)) {
      return false;
    } else {
      return authority.canCall(src, this, sig);
    }
  }
}

contract DSNote {
  event LogNote(bytes4 indexed sig, address indexed guy, bytes32 indexed foo, bytes32 indexed bar, uint256 wad, bytes fax) anonymous;

  modifier note() {
    bytes32 foo;
    bytes32 bar;

    assembly {
      foo := calldataload(4)
      bar := calldataload(36)
    }

    emit LogNote(msg.sig, msg.sender, foo, bar, msg.value, msg.data);

    _;
  }
}

contract SWalletFactory {
  event Created(address indexed sender, address indexed owner, address proxy, address cache);
  mapping(address => bool) public isProxy;
  SWalletCache public cache = new SWalletCache();

  // deploys a new proxy instance
  // sets owner of proxy to caller
  function build() public returns (SWallet proxy) {
    proxy = build(msg.sender);
  }

  // deploys a new proxy instance
  // sets custom owner of proxy
  function build(address owner) public returns (SWallet proxy) {
    proxy = new SWallet(cache);
    emit Created(msg.sender, owner, address(proxy), address(cache));
    proxy.setOwner(owner);
    isProxy[proxy] = true;
  }
}

contract SWalletCache {
  mapping(bytes32 => address) cache;

  function read(bytes _code) public view returns (address) {
    bytes32 hash = keccak256(_code);
    return cache[hash];
  }

  function write(bytes _code) public returns (address target) {
    assembly {
      target := create(0, add(_code, 0x20), mload(_code))
      switch iszero(extcodesize(target))
      case 1 {
        // throw if contract failed to deploy
        revert(0, 0)
      }
    }
    bytes32 hash = keccak256(_code);
    cache[hash] = target;
  }
}

contract SWallet is DSAuth, DSNote {
  SWalletCache public cache; // global cache for contracts

  constructor(address _cacheAddr) public {
    require(setCache(_cacheAddr));
  }

  function() public payable {}

  // use the proxy to execute calldata _data on contract _code
  function execute(bytes _code, bytes _data) public payable returns (address target, bytes32 response) {
    target = cache.read(_code);
    if (target == 0x0) {
      // deploy contract & store its address in cache
      target = cache.write(_code);
    }

    response = execute(target, _data);
  }

  function execute(address _target, bytes _data) public payable auth note returns (bytes32 response) {
    require(_target != 0x0);

    // call contract in current context
    assembly {
      let succeeded := delegatecall(sub(gas, 5000), _target, add(_data, 0x20), mload(_data), 0, 32)
      response := mload(0) // load delegatecall output
      switch iszero(succeeded)
      case 1 {
        // throw if delegatecall failed
        revert(0, 0)
      }
    }
  }

  //set new cache
  function setCache(address _cacheAddr) public auth note returns (bool) {
    require(_cacheAddr != 0x0); // invalid cache address
    cache = SWalletCache(_cacheAddr); // overwrite cache
    return true;
  }
}
