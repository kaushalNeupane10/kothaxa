from django.db import models
from django.contrib.auth.models import User



class Room(models.Model):
    owner= models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price =models.DecimalField(max_digits=10, decimal_places=2)
    address = models.CharField(max_length=255)
    phone= models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    


class RoomImage(models.Model):
    room = models.ForeignKey(Room, related_name= "images", on_delete=models.CASCADE)
    image= models.ImageField(upload_to = "room_images/")

    def __str__(self):
        return f"Images for {self.room.title}"    