import csv
import glob


with open("../loss_data.js","w") as b:
	b.write("loss_data = [\n")
	for f_path in glob.glob("../loss_data/*loss.csv"):
		#get data category and loss type
		split = f_path.split("_")
		data_cat = split[1].split("/")[1]
		with open(f_path,'r') as a:
			reader = csv.reader(a,delimiter=",")
			next(reader,None)
			for row in reader:
				time = row[0]
				time_step = row[1]
				gen_loss = row[2]
				disc_loss = row[5]
				image0 = "%s_epoch_%s_cat_0.png" % (str(data_cat), str(int(int(time_step)/200)))
				image1 = "%s_epoch_%s_cat_1.png" % (str(data_cat), str(int(int(time_step)/200)))
				image2 = "%s_epoch_%s_cat_2.png" % (str(data_cat), str(int(int(time_step)/200)))
				write_string = "{ time_step:%s, data_category:\"%s\", gen_loss:%s, disc_loss:%s, image0:\"%s\", image1:\"%s\", image2:\"%s\" },\n" % (str(time_step) ,str(data_cat),str(disc_loss),str(gen_loss),str(image0),str(image1),str(image2))
				b.write(write_string)


