

make_gif() {
    local gif="$1"
    shift
    echo "making $gif from $@"
    convert -delay 80 $@ -loop 0 $gif 

}

image_prefixes=$(ls *png | cut -d'_' -f1 | sort | uniq)

for prefix in $image_prefixes
do
    frames=${prefix}_*.png
    gif="${prefix}.gif"
    make_gif $gif $frames

    # add 2second delay to last frame
    convert $gif \( +clone -set delay 200 \) +swap +delete "${gif}"
done

