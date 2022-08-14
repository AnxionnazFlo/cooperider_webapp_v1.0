var files = <?php $out = array();
foreach (glob('./assets/tracks_points/*.*') as $filename) {
    $p = pathinfo($filename);
    $out[] = $p['filename'];
}
echo json_encode($out); ?>;