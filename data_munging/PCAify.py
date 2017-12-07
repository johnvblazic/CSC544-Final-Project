from scipy import misc
import glob
import numpy as np

with open("../pca_data.js","w") as b:
	b.write("pca_data = [\n")
	data_cat = "fashion"
	for im_path in glob.glob("../images/fashion*.png"):
		split = im_path.split("_")
		#print(split)
		image = misc.imread(im_path)
		#get time step and latent category
		time_step = int(split[2]) * 200
		lat_category = split[4].split(".")[0]
		for i in range(100):
			#get individual images
			row = i//10
			column = i%10
			mini_image = image[row*28:row*28+28,column*28:column*28+28]
			#get pca
			s= np.linalg.svd(mini_image,full_matrices=False,compute_uv=False)
			pc1 = s[0]
			pc2 = s[1]
			#write out
			write_string = "{ time_step:%s, data_category:\"%s\", lat_category:%s, pc1:%s, pc2:%s, row:%s, column:%s },\n" % (str(time_step) ,str(data_cat),str(lat_category),str(pc1),str(pc2),str(row),str(column))
			b.write(write_string)

	data_cat = "inf"
	for im_path in glob.glob("../images/inf*.png"):
		split = im_path.split("_")
		#print(split)
		image = misc.imread(im_path)
		#get time step and latent category
		time_step = int(split[2]) * 200
		lat_category = split[4].split(".")[0]
		for i in range(100):
			#get individual images
			row = i//10
			column = i%10
			mini_image = image[row*28:row*28+28,column*28:column*28+28]
			#get pca
			s= np.linalg.svd(mini_image,full_matrices=False,compute_uv=False)
			pc1 = s[0]
			pc2 = s[1]
			#write out
			write_string = "{ time_step:%s, data_category:\"%s\", lat_category:%s, pc1:%s, pc2:%s, row:%s, column:%s },\n" % (str(time_step) ,str(data_cat),str(lat_category),str(pc1),str(pc2),str(row),str(column))
			b.write(write_string)

	data_cat = "mnist"
	for im_path in glob.glob("../images/mnist*.png"):
		split = im_path.split("_")
		#print(split)
		image = misc.imread(im_path)
		#get time step and latent category
		time_step = int(split[2]) * 200
		lat_category = split[4].split(".")[0]
		for i in range(100):
			#get individual images
			row = i//10
			column = i%10
			mini_image = image[row*28:row*28+28,column*28:column*28+28]
			#get pca
			s= np.linalg.svd(mini_image,full_matrices=False,compute_uv=False)
			pc1 = s[0]
			pc2 = s[1]
			#write out
			write_string = "{ time_step:%s, data_category:\"%s\", lat_category:%s, pc1:%s, pc2:%s, row:%s, column:%s },\n" % (str(time_step) ,str(data_cat),str(lat_category),str(pc1),str(pc2),str(row),str(column))
			b.write(write_string)

	b.write("];")




