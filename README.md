# bdb-date
Component created for the Lab digital Projects.


# Usage
```javascript
<date [format]="'MMDDAAAA'" [callBackFormat]="'LL'"></date>

```
# Inputs
```
@callBackFormat : 
Have to be a moment format read DOCS https://momentjs.com/, it indicates the format of the returned date.

@format :
It indicates the order in what the elements in the html will be displayed. e.g. 'DDMMAAAA' 'AAAAMMDD' 'MMDDAAAA' 'MMAAAADD'
```

# OutPut
```
@date : 
It returns an object 
{
  validDate: It indicates if the value is a valid date,
  date: It contains a date object separated by day - month - year,
  dateFormatted: It contains the date formatted in the format indicated.
}

@validForm :
It indicates if the values typed are valid.
```
