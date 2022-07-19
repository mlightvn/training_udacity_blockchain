// SPDX-License-Identifier: Personal
pragma solidity 0.5.16;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
    struct Role {
        mapping(address => bool) bearer;
    }

    /**
     * @dev give an account access to this role
     */
    function add(Role storage role, address account) internal {
        require(account != address(0), "account cannot be the zero address");
        require(
            !has(role, account),
            "account is already a member of this role"
        );

        role.bearer[account] = true;
    }

    /**
     * @dev remove an account's access to this role
     */
    function remove(Role storage role, address account) internal {
        require(account != address(0), "account cannot be the zero address");
        require(has(role, account), "account is not a member of this role");

        role.bearer[account] = false;
    }

    /**
     * @dev check if an account has this role
     * @return bool
     */
    function has(Role storage role, address account)
        internal
        view
        returns (bool)
    {
        require(account != address(0), "account cannot be the zero address");
        return role.bearer[account];
    }
}
