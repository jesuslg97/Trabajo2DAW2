<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'Web' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'K9k7e@{vG&$(%&u?`-jB/Yzh*sh/H#NH$* p]=K5.s&W@5NOl>7(8G7*,6S<.Va)' );
define( 'SECURE_AUTH_KEY',  ':>rk;r]OTrdl}Ji1#CyUN37HiHnU+x?H@3>u]0T~RZ?opkQlPXqa:pHM[+Ky7k#F' );
define( 'LOGGED_IN_KEY',    'uy_>dcOHt0n,arX!5P!qgDaH$Zh%ZG,?[ >_frP@6oLNvmb<i=F#SK`l~0B9xB#$' );
define( 'NONCE_KEY',        'PHMVs*:3dtZr>C#Xd:1a8>i6=]?ButjF+klP!b?lrbSO99C4BgY-2!Qp,S>r%}%A' );
define( 'AUTH_SALT',        '5*0$bv|f4i1@N&yr{<pw7nvUX{<h_%y4{CoOB6gNh{1%:Qsu>.GaL}opT(U1em1?' );
define( 'SECURE_AUTH_SALT', 'Y!U*=77QTT5[B7HMdE2~0eyws*RS97$5BT-k0_:F&slt$;-&2 OZTa|!}rpa7U;N' );
define( 'LOGGED_IN_SALT',   '09yuX9]sh)6G{^#MHrd0iL6.&_</ur|Y WQ4@N/S4/pTcsr.U<aK3HlTZ g^i+d?' );
define( 'NONCE_SALT',       'I>!W5p1z7Lum.n-b0BN`L|J:#znXae%RKWRtUapX:~2<*,ejG]3zrkPf.2Q{%T~^' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
