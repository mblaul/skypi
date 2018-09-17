<?php 

echo gethostname();
echo "\n";
$command = `ifconfig`;
preg_match('/([0-9a-f]{2}:){5}\w\w/i', $command, $mac);
$mac = $mac[0];
echo $mac . "\n"; 

?>
