import sha3 from "./mod.js";
import {
  jssha3,
  BigNumber,
  testing,
} from "./deps.js";

const keccak256 = jssha3.keccak256;

function randomString(length, chars) {
  let result = "";

  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

function testSha3AgainstKeccak(length) {
  const value = randomString(
    length,
    "():0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  );

  testing.assertEquals(sha3(value), `0x${jssha3.keccak_256(value)}`);
}

Deno.test({
  name: "sha3 only receives string and Buffer",
  fn() {
    testing.assertThrows(() => sha3(new BigNumber(3294984243)));
    testing.assertThrows(() => sha3(null));
    testing.assertThrows(() => sha3({}));
    testing.assertThrows(() => sha3(true));
    testing.assertThrows(() => sha3(423897234924));
    testing.assertThrows(() => sha3(0));
    testing.assertThrows(() => sha3(0, true));
    testing.assertThrows(() => sha3(undefined));
    testing.assertThrows(() => sha3(undefined, true));
    testing.assertThrows(() => sha3(() => {}));
    testing.assertThrows(() => sha3(() => {}, true));
  },
});

Deno.test({
  name: "sha3 handles strings correctly",
  fn() {
    testing.assertEquals(typeof sha3("something new"), "string");
    testing.assertEquals(typeof sha3(""), "string");
    testing.assertEquals(typeof sha3("0x"), "string");
  },
});

Deno.test({
  name: "sha3 accepts tx hash",
  fn() {
    testing.assertEquals(
      typeof sha3(
        "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad",
      ),
      "string",
    );
  },
});

Deno.test({
  name: "sha3 accepts valid address",
  fn() {
    testing.assertEquals(
      typeof sha3("0x407d73d8a49eeb85d32cf465507dd71d507100c1"),
      "string",
    );
  },
});

Deno.test({
  name: "sha3 accepts 16 bytes hex",
  fn() {
    testing.assertEquals(typeof sha3("0x407d73d8a49eeb85d32cf4"), "string");
  },
});

Deno.test({
  name: "sha3 accepts 8 bytes hex",
  fn() {
    testing.assertEquals(typeof sha3("0x407d73d8a49eeb"), "string");
  },
});

Deno.test({
  name: "sha3 accepts 4 bytes hex",
  fn() {
    testing.assertEquals(typeof sha3("0x407d"), "string");
  },
});

Deno.test({
  name: "sha3 accepts 1 byte hex",
  fn() {
    testing.assertEquals(typeof sha3("0x01"), "string");
  },
});

Deno.test({
  name: "sha3 accepts string number",
  fn() {
    testing.assertEquals(typeof sha3("0"), "string");
    testing.assertEquals(typeof sha3("1"), "string");
    testing.assertEquals(typeof sha3("28748237"), "string");
    testing.assertEquals(typeof sha3("234874238979287"), "string");
    testing.assertEquals(typeof sha3("2438972349234729872"), "string");
    testing.assertEquals(
      typeof sha3("3429874892738497239487239847289472987238"),
      "string",
    );
    testing.assertEquals(
      typeof sha3("3429874892738497239487239847289472987238243827"),
      "string",
    );
    testing.assertEquals(
      typeof sha3("342348727829874892738497239487239847289472987238243827"),
      "string",
    );
  },
});

Deno.test({
  name: "sha3 accepts string contract bytecode",
  fn() {
    testing.assertEquals(
      typeof sha3(
        "606060405234610000575b6111c2806100186000396000f3606060405236156100d3576000357c0100000000000000000000000000000000000000000000000000000000900480630c9fd581146100dc5780632f2769d1146100f957806332958fcb1461016257806336f656d8146101975780634db19e7e14610274578063515361f6146102dd5780637ba048091461030357806388b44c851461036357806397624631146103cc57806398296c5414610466578063a34edc031461048c578063a5982885146104ec578063ba0bba4014610509578063f320d96314610518578063f7fe3477146105b2575b6100da5b5b565b005b34610000576100f760048080359060200190919050506105d8565b005b3461000057610160600480803590602001909190803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610684565b005b346100005761017d600480803590602001909190505061079f565b604051808260001916815260200191505060405180910390f35b3461000057610272600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506107d0565b005b34610000576102db600480803590602001909190803590602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061091d565b005b34610000576103016004808035906020019091908035906020019091905050610a16565b005b3461000057610361600480803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610ae4565b005b34610000576103ca600480803590602001909190803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610bdd565b005b3461000057610464600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610ccc565b005b346100005761048a6004808035906020019091908035906020019091905050610dcc565b005b34610000576104ea600480803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610e6e565b005b34610000576105076004808035906020019091905050610f67565b005b3461000057610516611013565b005b34610000576105b0600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050611016565b005b34610000576105d66004808035906020019091908035906020019091905050611116565b005b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e6106028261079f565b61060c600161079f565b60405180806020018460001916815260200183600019168152602001806020018381038352600a8152602001807f417373657274547275650000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b50565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e8373ffffffffffffffffffffffffffffffffffffffff166001028373ffffffffffffffffffffffffffffffffffffffff16600102836040518080602001856000191681526020018460001916815260200180602001838103835260088152602001807f41737365727445710000000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156107895780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b505050565b60006001151582151514156107be57600160010290506107cb566107ca565b600060010290506107cb565b5b919050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e83604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050604051809103902083604051808280519060200190808383829060006004602084601f0104600302600f01f1509050019150506040518091039020836040518080602001856000191681526020018460001916815260200180602001838103835260088152602001807f41737365727445710000000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156109075780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b505050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e6109478461079f565b6109508461079f565b836040518080602001856000191681526020018460001916815260200180602001838103835260088152602001807f41737365727445710000000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610a005780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b505050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e8273ffffffffffffffffffffffffffffffffffffffff166001028273ffffffffffffffffffffffffffffffffffffffff166001026040518080602001846000191681526020018360001916815260200180602001838103835260088152602001807f417373657274457100000000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e610b0e8361079f565b610b18600061079f565b8360405180806020018560001916815260200184600019168152602001806020018381038352600b8152602001807f41737365727446616c73650000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610bc85780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e8360010283600102836040518080602001856000191681526020018460001916815260200180602001838103835260088152602001807f41737365727445710000000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610cb65780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b505050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e82604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050604051809103902082604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505060405180910390206040518080602001846000191681526020018360001916815260200180602001838103835260088152602001807f417373657274457100000000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e82600102826001026040518080602001846000191681526020018360001916815260200180602001838103835260088152602001807f417373657274457100000000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e610e988361079f565b610ea2600161079f565b8360405180806020018560001916815260200184600019168152602001806020018381038352600a8152602001807f41737365727454727565000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610f525780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e610f918261079f565b610f9b600061079f565b60405180806020018460001916815260200183600019168152602001806020018381038352600b8152602001807f41737365727446616c736500000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b50565b5b565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e82604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050604051809103902082604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505060405180910390206040518080602001846000191681526020018360001916815260200180602001838103835260088152602001807f417373657274457100000000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e6111408361079f565b6111498361079f565b6040518080602001846000191681526020018360001916815260200180602001838103835260088152602001807f417373657274457100000000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b505056",
      ),
      "string",
    );
  },
});

Deno.test({
  name: "sha3 accepts string contract hexed bytecode",
  fn() {
    testing.assertEquals(
      typeof sha3(
        "0x606060405234610000575b6111c2806100186000396000f3606060405236156100d3576000357c0100000000000000000000000000000000000000000000000000000000900480630c9fd581146100dc5780632f2769d1146100f957806332958fcb1461016257806336f656d8146101975780634db19e7e14610274578063515361f6146102dd5780637ba048091461030357806388b44c851461036357806397624631146103cc57806398296c5414610466578063a34edc031461048c578063a5982885146104ec578063ba0bba4014610509578063f320d96314610518578063f7fe3477146105b2575b6100da5b5b565b005b34610000576100f760048080359060200190919050506105d8565b005b3461000057610160600480803590602001909190803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610684565b005b346100005761017d600480803590602001909190505061079f565b604051808260001916815260200191505060405180910390f35b3461000057610272600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506107d0565b005b34610000576102db600480803590602001909190803590602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061091d565b005b34610000576103016004808035906020019091908035906020019091905050610a16565b005b3461000057610361600480803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610ae4565b005b34610000576103ca600480803590602001909190803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610bdd565b005b3461000057610464600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610ccc565b005b346100005761048a6004808035906020019091908035906020019091905050610dcc565b005b34610000576104ea600480803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610e6e565b005b34610000576105076004808035906020019091905050610f67565b005b3461000057610516611013565b005b34610000576105b0600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050611016565b005b34610000576105d66004808035906020019091908035906020019091905050611116565b005b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e6106028261079f565b61060c600161079f565b60405180806020018460001916815260200183600019168152602001806020018381038352600a8152602001807f417373657274547275650000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b50565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e8373ffffffffffffffffffffffffffffffffffffffff166001028373ffffffffffffffffffffffffffffffffffffffff16600102836040518080602001856000191681526020018460001916815260200180602001838103835260088152602001807f41737365727445710000000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156107895780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b505050565b60006001151582151514156107be57600160010290506107cb566107ca565b600060010290506107cb565b5b919050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e83604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050604051809103902083604051808280519060200190808383829060006004602084601f0104600302600f01f1509050019150506040518091039020836040518080602001856000191681526020018460001916815260200180602001838103835260088152602001807f41737365727445710000000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156109075780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b505050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e6109478461079f565b6109508461079f565b836040518080602001856000191681526020018460001916815260200180602001838103835260088152602001807f41737365727445710000000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610a005780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b505050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e8273ffffffffffffffffffffffffffffffffffffffff166001028273ffffffffffffffffffffffffffffffffffffffff166001026040518080602001846000191681526020018360001916815260200180602001838103835260088152602001807f417373657274457100000000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e610b0e8361079f565b610b18600061079f565b8360405180806020018560001916815260200184600019168152602001806020018381038352600b8152602001807f41737365727446616c73650000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610bc85780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e8360010283600102836040518080602001856000191681526020018460001916815260200180602001838103835260088152602001807f41737365727445710000000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610cb65780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b505050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e82604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050604051809103902082604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505060405180910390206040518080602001846000191681526020018360001916815260200180602001838103835260088152602001807f417373657274457100000000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e82600102826001026040518080602001846000191681526020018360001916815260200180602001838103835260088152602001807f417373657274457100000000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e610e988361079f565b610ea2600161079f565b8360405180806020018560001916815260200184600019168152602001806020018381038352600a8152602001807f41737365727454727565000000000000000000000000000000000000000000008152602001506020018381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610f525780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e610f918261079f565b610f9b600061079f565b60405180806020018460001916815260200183600019168152602001806020018381038352600b8152602001807f41737365727446616c736500000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b50565b5b565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e82604051808280519060200190808383829060006004602084601f0104600302600f01f150905001915050604051809103902082604051808280519060200190808383829060006004602084601f0104600302600f01f15090500191505060405180910390206040518080602001846000191681526020018360001916815260200180602001838103835260088152602001807f417373657274457100000000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b5050565b7fa7fc9c2b3d6e1ecc2de7fb31320fb09e5b14a076d8b51df0262cd627d38ecd2e6111408361079f565b6111498361079f565b6040518080602001846000191681526020018360001916815260200180602001838103835260088152602001807f417373657274457100000000000000000000000000000000000000000000000081526020015060200183810382526000815260200160000194505050505060405180910390a15b505056",
      ),
      "string",
    );
  },
});

Deno.test({
  name: "sha3 adds hex prefix",
  fn() {
    const output = sha3("fdsfkjhsdf");
    testing.assertEquals(typeof output, "string");
    testing.assertEquals(output.substring(0, 2), "0x");
  },
});

Deno.test({
  name: "sha3 returns Buffer when string passed",
  fn() {
    testing.assertEquals(typeof sha3("fdsfkjhsdf", true), "object");
  },
});

Deno.test({
  name: "should works just like js-sha3",
  fn() {
    for (let length = 0; length < 66; length++) {
      for (let count = 0; count < 3000; count++) {
        testSha3AgainstKeccak(length);
      }
    }
  },
});
