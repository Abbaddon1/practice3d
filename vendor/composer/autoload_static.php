<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitc13ce2b90731b0dc219e5691b791f14d
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'Practice\\Practiceapp\\' => 21,
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Practice\\Practiceapp\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitc13ce2b90731b0dc219e5691b791f14d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitc13ce2b90731b0dc219e5691b791f14d::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitc13ce2b90731b0dc219e5691b791f14d::$classMap;

        }, null, ClassLoader::class);
    }
}