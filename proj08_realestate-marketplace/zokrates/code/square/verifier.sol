// SPDX-License-Identifier: MIT
// This file is MIT Licensed.
//
// Copyright 2017 Christian Reitwiessner
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
pragma solidity ^0.8.0;

library Pairing {
    struct G1Point {
        uint256 X;
        uint256 Y;
    }
    // Encoding of field elements is: X[0] * z + X[1]
    struct G2Point {
        uint256[2] X;
        uint256[2] Y;
    }

    /// @return the generator of G1
    function P1() internal pure returns (G1Point memory) {
        return G1Point(1, 2);
    }

    /// @return the generator of G2
    function P2() internal pure returns (G2Point memory) {
        return
            G2Point(
                [
                    10857046999023057135944570762232829481370756359578518086990519993285655852781,
                    11559732032986387107991004021392285783925812861821192530917403151452391805634
                ],
                [
                    8495653923123431417604973247489272438418190587263600148770280649306958101930,
                    4082367875863433681332203403145435568316851327593401208105741076214120093531
                ]
            );
    }

    /// @return the negation of p, i.e. p.addition(p.negate()) should be zero.
    function negate(G1Point memory p) internal pure returns (G1Point memory) {
        // The prime q in the base field F_q for G1
        uint256 q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;
        if (p.X == 0 && p.Y == 0) return G1Point(0, 0);
        return G1Point(p.X, q - (p.Y % q));
    }

    /// @return r the sum of two points of G1
    function addition(G1Point memory p1, G1Point memory p2)
        internal
        view
        returns (G1Point memory r)
    {
        uint256[4] memory input;
        input[0] = p1.X;
        input[1] = p1.Y;
        input[2] = p2.X;
        input[3] = p2.Y;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 6, input, 0xc0, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success
            case 0 {
                invalid()
            }
        }
        require(success);
    }

    /// @return r the product of a point on G1 and a scalar, i.e.
    /// p == p.scalar_mul(1) and p.addition(p) == p.scalar_mul(2) for all points p.
    function scalar_mul(G1Point memory p, uint256 s)
        internal
        view
        returns (G1Point memory r)
    {
        uint256[3] memory input;
        input[0] = p.X;
        input[1] = p.Y;
        input[2] = s;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 7, input, 0x80, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success
            case 0 {
                invalid()
            }
        }
        require(success);
    }

    /// @return the result of computing the pairing check
    /// e(p1[0], p2[0]) *  .... * e(p1[n], p2[n]) == 1
    /// For example pairing([P1(), P1().negate()], [P2(), P2()]) should
    /// return true.
    function pairing(G1Point[] memory p1, G2Point[] memory p2)
        internal
        view
        returns (bool)
    {
        require(p1.length == p2.length);
        uint256 elements = p1.length;
        uint256 inputSize = elements * 6;
        uint256[] memory input = new uint256[](inputSize);
        for (uint256 i = 0; i < elements; i++) {
            input[i * 6 + 0] = p1[i].X;
            input[i * 6 + 1] = p1[i].Y;
            input[i * 6 + 2] = p2[i].X[1];
            input[i * 6 + 3] = p2[i].X[0];
            input[i * 6 + 4] = p2[i].Y[1];
            input[i * 6 + 5] = p2[i].Y[0];
        }
        uint256[1] memory out;
        bool success;
        assembly {
            success := staticcall(
                sub(gas(), 2000),
                8,
                add(input, 0x20),
                mul(inputSize, 0x20),
                out,
                0x20
            )
            // Use "invalid" to make gas estimation work
            switch success
            case 0 {
                invalid()
            }
        }
        require(success);
        return out[0] != 0;
    }

    /// Convenience method for a pairing check for two pairs.
    function pairingProd2(
        G1Point memory a1,
        G2Point memory a2,
        G1Point memory b1,
        G2Point memory b2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](2);
        G2Point[] memory p2 = new G2Point[](2);
        p1[0] = a1;
        p1[1] = b1;
        p2[0] = a2;
        p2[1] = b2;
        return pairing(p1, p2);
    }

    /// Convenience method for a pairing check for three pairs.
    function pairingProd3(
        G1Point memory a1,
        G2Point memory a2,
        G1Point memory b1,
        G2Point memory b2,
        G1Point memory c1,
        G2Point memory c2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](3);
        G2Point[] memory p2 = new G2Point[](3);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        return pairing(p1, p2);
    }

    /// Convenience method for a pairing check for four pairs.
    function pairingProd4(
        G1Point memory a1,
        G2Point memory a2,
        G1Point memory b1,
        G2Point memory b2,
        G1Point memory c1,
        G2Point memory c2,
        G1Point memory d1,
        G2Point memory d2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](4);
        G2Point[] memory p2 = new G2Point[](4);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p1[3] = d1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        p2[3] = d2;
        return pairing(p1, p2);
    }
}

contract Verifier {
    using Pairing for *;
    struct VerifyingKey {
        Pairing.G1Point alpha;
        Pairing.G2Point beta;
        Pairing.G2Point gamma;
        Pairing.G2Point delta;
        Pairing.G1Point[] gamma_abc;
    }
    struct Proof {
        Pairing.G1Point a;
        Pairing.G2Point b;
        Pairing.G1Point c;
    }

    function verifyingKey() internal pure returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(
            uint256(
                0x2dca3cc993c85df15861579892c1fb0225529da020f61ad939bac702e30a2ab9
            ),
            uint256(
                0x09dd7df7005784699b3fe47de56ba19be6fa7c9ebe691842ed5f785e955a4603
            )
        );
        vk.beta = Pairing.G2Point(
            [
                uint256(
                    0x2407bee63b83421dabab8553a27821e1192ebd4a7580c00d46019b69bd98b68d
                ),
                uint256(
                    0x1f781d58b6017c8cd79c89e07b44f92149e65f010968170007e90926dbfcc6cb
                )
            ],
            [
                uint256(
                    0x22239d6dae415cc5af77d86c74f52b212c7173e4d1b286e302efc72b8fa0d7bc
                ),
                uint256(
                    0x1bfaa50c6db1feacf52d1e5584ff2e59e998891731c96a6c507ce745c711bc15
                )
            ]
        );
        vk.gamma = Pairing.G2Point(
            [
                uint256(
                    0x23ad74a42c23aa9711c252dd54d4ccf5c15b241b20f2a46883ef55d86458081d
                ),
                uint256(
                    0x1b5b041414585b9a11f226990789b1f9c8e568c6d9752bc141d3233276f49a03
                )
            ],
            [
                uint256(
                    0x069ddb5043fe9987161627b4a3ddc1207c21e5f6dd2b3786b70b5ec81b8d243b
                ),
                uint256(
                    0x04e5a2c96c620a835a11e0c9c94b8c5c24a1d225e398a67ec0463797bd40f9b0
                )
            ]
        );
        vk.delta = Pairing.G2Point(
            [
                uint256(
                    0x08887673aef369162b01a25c00d1ef56e3166b60c4fcaae083c4d2c55fce49ec
                ),
                uint256(
                    0x1d9c5443d16b83b9b7aeb6e0abbe590d661c7dcf28a94f710463aa262d982c0d
                )
            ],
            [
                uint256(
                    0x1fb4853d8ab2a03a7ee6cdf20b44695b7d7590811b5ca2dedc03aaa482f80cb5
                ),
                uint256(
                    0x0e569c92f0f62bda61da2b7882ccf9ecc81014c47684882dfd771b74cdd913aa
                )
            ]
        );
        vk.gamma_abc = new Pairing.G1Point[](2);
        vk.gamma_abc[0] = Pairing.G1Point(
            uint256(
                0x16dd0cc07af5851c181ebed5103b5ecd32ffccaeb29a6ac5b21d6bfa8be700cf
            ),
            uint256(
                0x136d4e8ccea4eb79aa9a12f43dec4c0706590f3d80f26be72c93159d212f1dae
            )
        );
        vk.gamma_abc[1] = Pairing.G1Point(
            uint256(
                0x2d01b7f397b1f9cb5b3bb44e123a9917f3bdca2d88a268a330d6487e0275ad13
            ),
            uint256(
                0x1cadd1ef365e781032368fad7f212199d38de614b15808b149e929e622bcf1e5
            )
        );
    }

    function verify(uint256[] memory input, Proof memory proof)
        internal
        view
        returns (uint256)
    {
        uint256 snark_scalar_field = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
        VerifyingKey memory vk = verifyingKey();
        require(input.length + 1 == vk.gamma_abc.length);
        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);
        for (uint256 i = 0; i < input.length; i++) {
            require(input[i] < snark_scalar_field);
            vk_x = Pairing.addition(
                vk_x,
                Pairing.scalar_mul(vk.gamma_abc[i + 1], input[i])
            );
        }
        vk_x = Pairing.addition(vk_x, vk.gamma_abc[0]);
        if (
            !Pairing.pairingProd4(
                proof.a,
                proof.b,
                Pairing.negate(vk_x),
                vk.gamma,
                Pairing.negate(proof.c),
                vk.delta,
                Pairing.negate(vk.alpha),
                vk.beta
            )
        ) return 1;
        return 0;
    }

    function verifyTx(Proof memory proof, uint256[1] memory input)
        public
        view
        returns (bool r)
    {
        uint256[] memory inputValues = new uint256[](1);

        for (uint256 i = 0; i < input.length; i++) {
            inputValues[i] = input[i];
        }
        if (verify(inputValues, proof) == 0) {
            return true;
        } else {
            return false;
        }
    }
}
